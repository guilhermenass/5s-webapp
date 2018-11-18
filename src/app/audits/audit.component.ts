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
import { SaveAuditDto } from './save-audit-dto';

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
  
  messageAuditsGrid = {
    emptyMessage: 'Nenhuma auditoria cadastrada',
   }

  audit: Audit = new Audit();
  saveAudit: SaveAuditDto;
  evaluations = new Array<Evaluation>();
  enviroments: Enviroment[];
  enviromentsList: Enviroment[];
  userEmails: Array<string> = [];
  users: User[];
  user_selected: number = -1;
  selected = [];
  isMultiple: boolean = true;
  audits: Audit[] = new Array<Audit>();
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
    this.selected.forEach((environment : Enviroment) => {
      this.evaluations.push(new Evaluation(new Enviroment(environment.id, 
                                                          environment.block, 
                                                          environment.description,
                                                          environment.name,
                                                          environment.enviroment_types_id,
                                                          environment.units_id,
                                                          environment.users_id), 
                                           new User(
                                             this.users[this.user_selected].id, 
                                             this.users[this.user_selected].name, this.users[this.user_selected].email)
                                          ));
      this.enviromentsList = this.enviromentsList.filter( env => env != environment);
      this.selected = [];
    });
    this.user_selected = -1;
  }

  /**
   * Remove a avaliação e adiciona o ambiente da avaliação excluida a lista de ambientes disponiveis
   * @param i index no array
   */
  removeEvaluation(i: number){
    const env = this.enviroments.find(env => env.id === this.evaluations[i].Enviroment.id);
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
    this.audits = [];
    this.auditService.load()
      .subscribe(audits => {
        audits.forEach(audit => {
            this.audits.push(new Audit(audit.title, 
                                       audit.Evaluations[0].Enviroment.Unit, 
                                       audit.Evaluations,
                                       audit.initial_date,
                                       audit.due_date,
                                       audit.description,
                                       audit.status,
                                       audit.id));
          });
          this.audits = this.audits.filter(x => x != null);
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

  save(audit: Audit) {
    audit.initial_date = this.period[0];
    audit.due_date = this.period[1];
    
    audit.evaluations = this.evaluations;
    this.saveAudit = this.mapperSaveAudit(audit);
    this.audits = this.audits.filter(x => x != null);
    if(!audit.id){
      audit.status = 0;
      this.auditService.save(this.saveAudit)
        .subscribe(async res => {
          this.getValidation(res);
          this.saveAudit.id = res['auditId'];
          this.saveAudit.evaluations.forEach( env => {
            env.audits_id = this.saveAudit.id;
          });
          await this._evaluationService.save(this.saveAudit)
            .subscribe(async () => {
              await this.auditService.sendEmail(this.userEmails);
              this.load();
            });
            this.resetForm();
        });
    } else {
      this.auditService.update(this.saveAudit)
      .subscribe(res => {
        this.getValidation(res);
        this.auditForm.reset();
          this.saveAudit.evaluations.forEach( env => {
            env.audits_id = this.saveAudit.id;
          });
        this._evaluationService.save(this.saveAudit);
        this.load();
        this.resetForm();
      });
    }
  }

  resetForm(){
    this.enviromentsList = [];
    this.evaluations = [];
    this.audit = new Audit();
    this.evaluations = new Array<Evaluation>();
    this.auditForm.reset();
  }

  async update(audit: Audit): Promise<void> {
      this.audit = new Audit(audit.title,audit.unit,audit.evaluations,audit.initial_date,audit.due_date,audit.description,audit.status,audit.id);
      this.evaluations = new Array<Evaluation>();
      this.evaluations = this.mapperNewArrayEvaluations(audit.evaluations);
      this.audit.unit.id  = audit.unit.id;
      await this._enviromentService.loadEnviromentsByUnit(audit.unit_id)
      .subscribe(enviroments => {
        this.enviroments = enviroments;
        this.enviromentsList = enviroments;
        this.evaluations.forEach(x => {
          this.enviromentsList = this.enviromentsList.filter(b => b.id != x.Enviroment.id);
        })
    });
      this.period = [moment(audit.initial_date).toDate(), moment(audit.due_date).toDate()];
      window.scroll(0, 0);
  }

  mapperNewArrayEvaluations(evaluations: Array<Evaluation>): Array<Evaluation>{
    let newEvaluations = new Array<Evaluation>();
    evaluations.forEach(evaluation => {
      let enviroment = new Enviroment(evaluation.Enviroment.id, evaluation.Enviroment.block, evaluation.Enviroment.description,
        evaluation.Enviroment.name, evaluation.Enviroment.enviroment_types_id, evaluation.Enviroment.units_id, evaluation.Enviroment.users_id);
      let user = new User(evaluation.User.id, evaluation.User.name, evaluation.User.email, evaluation.User.password, evaluation.User.profile);
      newEvaluations.push(new Evaluation(enviroment, user, evaluation.id))
    });
    return newEvaluations;
  }

  mapperSaveAudit(audit: Audit): SaveAuditDto{
    let evaluations = new Array<SaveEvaluationDto>();
    this.evaluations.forEach( env => {
      this.userEmails.push(env.User.email);
      evaluations.push(this.mapperSaveEvaluation(env));
    })
    return new SaveAuditDto(audit.title, 
                            audit.unit_id, 
                            evaluations,
                            audit.initial_date,
                            audit.due_date,
                            audit.description,
                            0,
                            audit.id)
  }

  mapperSaveEvaluation(evaluation: Evaluation): SaveEvaluationDto{
    return new SaveEvaluationDto(evaluation.id, evaluation.id, evaluation.Enviroment.id, evaluation.User.id);
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
   // this.auditFiltered = this.audits.slice(startItem, endItem);
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

  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;


  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}