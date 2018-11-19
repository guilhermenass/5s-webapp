import { Component, OnInit } from '@angular/core';
import { Audit } from '../audits/audit';
import { Unit } from '../units/unit';
import { AuditService } from '../audits/audit.service';
import { UnitService } from '../units/unit.service';
import { ReportService } from './report.service';
import { Evaluation } from '../audits/evaluation';
import { Report } from './report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report: Report = new Report();
  audits: Audit[] = [];
  units: Unit[] = [];
  evaluations: Evaluation[];
  isFiltered: boolean = false;

  constructor(private _auditService: AuditService,
              private _unitService: UnitService,
              private _reportService: ReportService) { }

  ngOnInit() {
    this.loadUnits();
  }

  /**
   * Método que retorna todas as unidades
   * @param unitId Identificador da unidade
   */
  loadUnits() {
    this._unitService.load()
    .subscribe(res => {
      this.units = res;
    })
  }


   /**
   * Método que retorna as auditorias de acordo com a unidade selecionada
   */
  loadAuditsByUnit(unitId: number) {
    this._auditService.loadAuditsByUnit(unitId)
    .subscribe(res => {
      this.audits = res;
    })
  }

  /**
   * Método responsável por enviar os parametros de filtro para o serviço de back-end
   */
  filter() {
    this.isFiltered = true;
    this._reportService.filter(this.report.auditId)
    .subscribe(res => {
      this.evaluations = res;
    })
  }
}
