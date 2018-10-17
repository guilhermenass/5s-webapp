import { Component, OnInit, ViewChild } from '@angular/core';
import { Audit } from './audit';
import { AuditService } from './audit.service';
import { EnviromentService } from '../enviroments/enviroment.service';
import { Enviroment } from '../enviroments/enviroment';
import { User } from '../users/user';
import { Unit } from '../units/unit';
import { UserService } from '../users/user.service';
import * as moment from 'moment';
import { IOption } from 'ng-select';
import { defineLocale, PageChangedEvent } from 'ngx-bootstrap';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';
import { UnitService } from '../units/unit.service';
import { Evaluation } from './evaluation'
import { EvaluationService } from '../evaluations/evaluation.service';
import { SaveEvaluationDto } from './save-evaluation-dto';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html'
})

export class AuditComponent implements OnInit {
  
  message = {
   emptyMessage: 'Nenhum ambiente disponivel',
   totalMessage: 'Total',
   selectedMessage: 'Selecionados'
  }
  
  audit: Audit = new Audit();
  
  evaluations = new Array<Evaluation>();
  enviroments: Enviroment[];
  enviromentsList: Enviroment[];
  
  users: User[];
  user_selected: number = -1;
  
  selected = [];

  isMultiple: boolean = true;
  audits: Audit[];
  period: Date[];
  units: Unit[];
  selectItems: Array<IOption> ;
  selectedEnviroment: Array<string> = [];

  //Filter and pagination
  auditFiltered: Audit[];
  lengthAuditsPagination: number;
  @ViewChild('auditForm') auditForm : NgForm;

  constructor(private auditService: AuditService,
    private _userService: UserService,
    private _enviromentService: EnviromentService,
    private _evaluationService: EvaluationService,
    private _unitService: UnitService) {
    moment.locale('pt-BR');
    defineLocale('pt-br', ptBrLocale);
  }

  ngOnInit() {

    moment.locale('pt-br');
    this.loadUsers();
    this.loadUnits();
    this.load();
  }

  /**
   * Adiciona a lista de avaliações e remove o ambiente da lista de ambientes
   */
  createEvaluation(){
    this.selected.forEach((environment) => {
      this.evaluations.push(new Evaluation(environment.id, 
                                           environment.name, 
                                           this.users[this.user_selected].id, 
                                           this.users[this.user_selected].name));
      this.enviromentsList = this.enviromentsList.filter( env => env != environment);
      this.selected = [];
      this.user_selected = -1;
    });
  }

  /**
   * Remove a avaliação e adiciona o ambiente da avaliação excluida a lista de ambientes disponiveis
   * @param i index no array
   */
  removeEvaluation(i: number){
    const env = this.enviroments.find(env => env.id === this.evaluations[i].environment_id);
    this.enviromentsList.push(new Enviroment(env.id,env.block, 
                                             env.description, 
                                             env.name, 
                                             env.enviroment_types_id, 
                                             env.units_id, 
                                             env.users_id));
    this.enviromentsList = this.enviromentsList.filter(x => x != null);
    this.evaluations.splice(i,1);
  }
  findAudits(typed: string) {
    this.auditFiltered = this.audits.filter(
      audit => audit.title.toLowerCase().includes(typed.toLowerCase()));
    this.lengthAuditsPagination = this.auditFiltered.length
  }

  load() {
    this.auditService.load()
      .subscribe(
        audits => {
          this.audits = audits;
          this.auditFiltered = this.audits.slice(0, 10);
          this.lengthAuditsPagination = this.audits.length;
        },
        error => {
          console.log(error)
        },
    );
  }

   loadEnviromentsByUnit(unitId) {
      this._enviromentService.loadEnviromentsByUnit(unitId)
        .subscribe(enviroments => {
          this.enviroments = enviroments;
          this.enviromentsList = enviroments;
      });
   }

  loadUsers() {
    this._userService.load()
      .subscribe(users => {
        this.users = this.getAppraisers(users);
      })
  }

  loadUnits() {
    this._unitService.load()
      .subscribe(units => {
        this.units = units;
      })
  }

  getAppraisers(users) {
    return users.filter(
      user => user.profile == 2 ||
      user.profile == 3 ||
      user.profile == 6 || 
      user.profile == 7);   
  }

  save(audit) {
   /* this.evaluation.enviroments_id = this.selectedEnviroment;
    audit.initial_date = this.period[0];
    audit.due_date = this.period[1];
    this.audit.status = this.checkStatus(audit);
    audit.evaluations = this.evaluation;
    if(!audit.id){
      this.auditService.save(audit)
        .subscribe(res => {
          this.getValidation(res);
          audit.id = res['auditId'];
          this._evaluationService.save(audit)
          .subscribe(res => {
            console.log(res);
          })
          this.auditForm.reset();
          this.load();
        })
    } else {
      if(audit.status != "CONCLUIDA") {
        this.auditService.update(audit)
        .subscribe(res => {
          this.getValidation(res);
          this.auditForm.reset();
          this.load();
        })
      }
    }*/
  }

  update(audit: Audit): void {
  /*  this.isMultiple = false; // em modo edição, o usuário não pode selecionar multiplos ambientes
    this.selectedEnviroment = [];
    if(audit.status != "CONCLUIDA"){  
      this.evaluation.users_id = audit.users_id; 
      audit.units_id  = audit.units_id;
      moment.locale('pt-BR');
      this.loadEnviromentsByUnit(audit.units_id);
      this.period = [moment(audit.initial_date).toDate(), moment(audit.due_date).toDate()];
      this.audit = audit;
      this.selectedEnviroment.push(this.audit.enviroments_id.toString());
      window.scroll(0, 0);
    }*/
  }

  getValidation(res) {
    swal({
      title: '',
      text: res["message"],
      icon: res["type"]
    });
  }

  getModalAnswer(auditId) {
    swal({
      title: 'Exclusão de auditoria',
      text: 'Tem certeza que deseja excluir a auditoria?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete)
          this.remove(auditId);
      });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.auditFiltered = this.audits.slice(startItem, endItem);
  }

  remove(id: number): void {
    this.auditService.remove(id)
    .subscribe((res) => {
      this.getValidation(res);
      this.load();
      this.auditForm.reset();
    },
      error => {
        this.getValidation(error.error)
      }
    );
  }

  checkStatus(audit: Audit): string {
    return audit.due_date.getTime() >= new Date().setHours(0,0,0,0)
      ? audit.status = "PENDENTE" : audit.status = "ATRASADA";
  }
}