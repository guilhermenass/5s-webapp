import { Component, OnInit, Input } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Evaluation } from '../audits/evaluation';

@Component({
  selector: 'report-results',
  templateUrl: './report-results.component.html'
})
export class ReportResultsComponent {

  constructor() { }

  @Input('evaluations') evaluations: Evaluation[];


  downloadExcel() {
    var options = { 
      showLabels: true, 
      useBom: true,
      noDownload: false,
      showTitle: false,
      headers: ["Bloco", "Nome do Ambiente", "Status", "Nota", "Data de finalização", "Avaliador", "Responsável do ambiente"]
    };
   
    new Angular5Csv(this.evaluations, 'Relatório 5S', options);
  }
}
