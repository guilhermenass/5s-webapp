import { Component, OnInit, ViewChild } from '@angular/core';
import { Audit } from './audit';
import { AuditService } from './audit.service';
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
  selector: 'app-audit',
  templateUrl: './audit.component.html'
})

export class AuditComponent implements OnInit {
  isMultiple: boolean = true;
  audit: Audit = new Audit();
  audits: Audit[];
  users: User[];
  units: Unit[];
  enviroments: Enviroment[];
  period: Date[];
  selectItems: Array<IOption>;
  selectedEnviroment: Array<string> = [];

  //Filter and pagination
  auditFiltered: Audit[];
  lengthAuditsPagination: number;
  @ViewChild('auditForm') auditForm : NgForm;

  constructor(private auditService: AuditService,
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
        this.users = this.getAppraisers(users);
      })
  }

  getAppraisers(users) {
    return users.filter(
      user => user.profile == 2 ||
      user.profile == 3 ||
      user.profile == 6 || 
      user.profile == 7);   
  }

  loadUnits() {
    this.unitService.load()
      .subscribe(units => {
        this.units = units;
      })
  }

  save(audit) {
    audit.enviroments_id = this.selectedEnviroment;
    audit.createDate = this.period[0];
    audit.dueDate = this.period[1];
    this.audit.status = this.checkStatus(audit);
    if(!audit.id){
      this.auditService.save(audit)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
        })
    } else {
      if(audit.status != "CONCLUIDA") {
        this.auditService.update(audit)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
        })
      }
    }
  }

  update(audit: Audit): void {
    this.isMultiple = false; // em modo edição, o usuário não pode selecionar multiplos ambientes
    this.selectedEnviroment = [];
    if(audit.status != "CONCLUIDA"){   
      audit.units_id  = audit.Enviroment.units_id; 
      moment.locale('pt-BR');
      this.loadEnviromentsByUnit(audit.units_id);
      this.period = [moment(audit.createDate).toDate(), moment(audit.dueDate).toDate()];
      this.audit = audit;
      this.selectedEnviroment.push(this.audit.enviroments_id.toString());
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
    return audit.dueDate.getTime() >= new Date().setHours(0,0,0,0)
      ? audit.status = "PENDENTE" : audit.status = "ATRASADA";
  }
}