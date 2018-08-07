import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question';
import swal from 'sweetalert';
import { IOption } from 'ng-select';
import { EnviromentTypeService } from '../enviroments-type/enviroment-type.service';
import { EnviromentType } from '../enviroments-type/enviroment-type';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgForm } from '@angular/forms';
import { UnitService } from '../units/unit.service';
import { Unit } from '../units/unit';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {

  constructor(
    private _questionService: QuestionService,
    private _enviromentTypeService: EnviromentTypeService,
    private _unitService: UnitService) { }

  cbSelectAll: boolean;
  unitId: number;
  questions: Question[];
  units: Unit[];
  enviromentTypes: EnviromentType[];
  question: Question = new Question();
  selectItems: Array<IOption>;
  selectedEnviromentTypes: Array<String> = [];
  questionFiltered: Question[];
  lengthQuestionPagination: number;

  @ViewChild('questionForm') questionForm: NgForm;

  ngOnInit() {
    this.load();
    this.loadUnits();
  }

  findQuestion(typed: string) {
    this.questionFiltered = this.questions.filter(
      question => question.title.toLowerCase().includes(typed.toLowerCase()));
    this.lengthQuestionPagination = this.questionFiltered.length;
  }

  selectAll(): void {
    if (this.cbSelectAll) {
      this.selectedEnviromentTypes = this.enviromentTypes.map(({ id, name }) =>
        ({ label: name, value: id.toString() })).map(item => String(item.value));
    }
    else
      this.selectedEnviromentTypes = [];
  }

  save(question): void {
    if (!question.id) {
      question['enviroment_types_id'] = this.selectedEnviromentTypes;
      this._questionService.save(question)
        .subscribe(res => {
          this.saveInAssociateTable(res['questions_id'], res['enviroment_types_id']);
          this.getValidation(res);
          this.load();
        });
    } else {
      question['enviroment_types_id'] = this.selectedEnviromentTypes;
      forkJoin([
        this._questionService.update(question), 
        this._enviromentTypeService.removeAssociatedItems(this.question.id),
      ])
      .subscribe(res => {
        this.saveInAssociateTable(this.question.id, this.question['enviroment_types_id'])
        this.getValidation(res[0]);
        this.load();
      })
    }
  }

  load() {
    this._questionService.load()
      .subscribe(
        questions => {
          this.questions = questions;
          this.questionFiltered = this.questions.slice(0, 10);
          this.lengthQuestionPagination = this.questions.length;
        },
        error => {
          console.log(error)
        },
    );
  }

  loadUnits() {
    this._unitService.load()
      .subscribe(
        units => {
          this.units = units;
        },
        error => {
          console.log(error);
        }
      );
  }

  loadEnviromentsTypeByUnit() {
    this._enviromentTypeService.loadEnviromentsTypeByUnit(this.unitId)
      .subscribe(
        enviromentTypes => {
          this.enviromentTypes = [];
          this.enviromentTypes = enviromentTypes;
          this.selectItems = enviromentTypes.map(({ id, name }) =>
            ({ label: name, value: id.toString() }));
        })
  }

  saveInAssociateTable(questionId, enviromentTypeId): void {
    this._questionService.saveInAssociateTable(questionId, enviromentTypeId)
      .subscribe(res => {console.log(res)});
  }

  update(question: Question): void {
    this._questionService.getAssociatedItems(question.id)
      .subscribe(relatedItems => {
        const items = this.enviromentTypes.filter(enviroment => relatedItems.find(relatedItem => enviroment.id === relatedItem.enviroment_types_id));
        this.selectedEnviromentTypes = items.map(item => String(item.id));
      });

    this._unitService.getUnitByEnviromentType(question.id)
      .subscribe(unitId => {
        this.unitId = Number(unitId);
        this.loadEnviromentsTypeByUnit();
      })

    this.question = question;
    window.scroll(0, 0);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.questionFiltered = this.questions.slice(startItem, endItem);
  }

  remove(id: string): void {
    this._questionService.removeAssociatedItems(id)
      .subscribe(res => {
        this._questionService.remove(id)
          .subscribe((res) => {
            this.getValidation(res);
            this.load();
            this.questionForm.reset();
          },
            error => {
              this.getValidation(error.error);
              this.load();
            })
      })
  }


  getValidation(res) {
    swal({
      title: '',
      text: res["message"],
      icon: res["type"]
    });
  }

  getModalAnswer(questionId) {
    swal({
      title: 'Exclusão de pergunta',
      text: 'Tem certeza que deseja excluir a pergunta?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete)
          this.remove(questionId);
      });
  }
}
