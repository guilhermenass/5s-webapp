import { Component, OnInit, ViewChild } from '@angular/core';
import { Evaluation } from './evaluation';
import { EvaluationService } from './evaluation.service';
import { EnviromentService } from '../enviroments/enviroment.service';
import { Enviroment } from '../enviroments/enviroment';
import { User } from '../users/user';
import { UserService } from '../users/user.service';
import * as moment from 'moment';
import { IOption } from 'ng-select';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale, PageChangedEvent } from 'ngx-bootstrap';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';
import { UnitService } from '../units/unit.service';
import { Unit } from '../units/unit';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html'
})

export class EvaluationComponent implements OnInit {
  evaluation: Evaluation = new Evaluation();
  evaluations: Evaluation[];
  users: User[];
  units: Unit[];
  enviroments: Enviroment[];
  period: Date[];
  selectItems: Array<IOption>;
  selectedEnviroment: Array<string> = [];

  //Filter and pagination
  evaluationFiltered: Evaluation[];
  lengthEvaluationsPagination: number;
  @ViewChild('evaluationForm') evaluationForm : NgForm;

  constructor(private evaluationService: EvaluationService,
    private userService: UserService,
    private enviromentService: EnviromentService,
    private unitService: UnitService) {
    moment.locale('pt-BR');
    defineLocale('pt-br', ptBrLocale);
  }

  ngOnInit() {
    moment.locale('pt-br');
    this.loadUsers();
    this.loadUnits();
    this.load();
  }

  findEvaluations(typed: string) {
    this.evaluationFiltered = this.evaluations.filter(
      evaluation => evaluation.title.toLowerCase().includes(typed.toLowerCase()));
    this.lengthEvaluationsPagination = this.evaluationFiltered.length
  }

  load() {
    this.evaluationService.load()
      .subscribe(
        evaluations => {
          this.evaluations = evaluations;
          this.evaluationFiltered = this.evaluations.slice(0, 10);
          this.lengthEvaluationsPagination = this.evaluations.length;
        },
        error => {
          console.log(error)
        },
    );
  }

  loadEnviromentsByUnit(unitId) {
    this.enviromentService.loadEnviromentsByUnit(unitId)
      .subscribe(enviroments => {
        this.enviroments = enviroments;
        this.selectItems = enviroments
          .map(({ id, name }) => (
            { label: name, value: id.toString() }));
      })
  }

  loadUsers() {
    this.userService.load()
      .subscribe(users => {
        this.users = users;
      })
  }

  loadUnits() {
    this.unitService.load()
      .subscribe(units => {
        this.units = units;
      })
  }

  save(evaluation) {
    evaluation.enviroments_id = this.selectedEnviroment;
    evaluation.createDate = this.period[0];
    evaluation.dueDate = this.period[1];
    this.evaluation.status = this.checkStatus(evaluation);
    if(!evaluation.id){
      this.evaluationService.save(evaluation)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
        })
    } else {
      if(evaluation.status != "CONCLUIDA") {
        this.evaluationService.update(evaluation)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
        })
      }
    }
  }

  update(evaluation: Evaluation): void {
    this.selectedEnviroment = [];
    if(evaluation.status != "CONCLUIDA"){   
      moment.locale('pt-BR');
      this.period = [moment(evaluation.createDate).toDate(), moment(evaluation.dueDate).toDate()];
      this.evaluation = evaluation;
      this.selectedEnviroment.push(this.evaluation.enviroments_id.toString());
      window.scroll(0, 0);
    }
  }

  getValidation(res) {
    swal({
      title: '',
      text: res["message"],
      icon: res["type"]
    });
  }

  getModalAnswer(evaluationId) {
    swal({
      title: 'Exclusão de avaliação',
      text: 'Tem certeza que deseja excluir a avaliação?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete)
          this.remove(evaluationId);
      });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.evaluationFiltered = this.evaluations.slice(startItem, endItem);
  }

  remove(id: number): void {
    this.evaluationService.remove(id)
    .subscribe((res) => {
      this.getValidation(res);
      this.load();
      this.evaluationForm.reset();
    },
      error => {
        this.getValidation(error.error)
      }
    );
  }

  checkStatus(evaluation: Evaluation): string {
    return evaluation.dueDate.getTime() >= new Date().setHours(0,0,0,0)
      ? evaluation.status = "PENDENTE" : evaluation.status = "ATRASADA";
  }
}