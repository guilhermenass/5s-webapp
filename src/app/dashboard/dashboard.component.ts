import {Component, OnInit} from '@angular/core';
import { EvaluationService } from '../evaluations/evaluation.service';
import { Evaluation } from '../evaluations/evaluation';
declare const $: any;
declare var Morris: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  evaluationss: Evaluation[];
  late: Evaluation[] = new Array<Evaluation>();
  outstanding: Evaluation[] = new Array<Evaluation>();
  concluded: Evaluation[] = new Array<Evaluation>();
  
  constructor(private evaluationService: EvaluationService) { 
    this.evaluationService.load()
        .subscribe(
            evaluations => {
            this.evaluationss = evaluations;
              this.FindEvaluationStatus(evaluations);
          });
  }

  FindEvaluationStatus(evaluations: Evaluation[]){

    evaluations.forEach(evaluation =>{
      if(evaluation.status.includes('CONCLUIDA')){
        this.concluded.push(evaluation);
      }else if(evaluation.status == "ATRASADA" ){
        this.late.push(evaluation)
      } else {
        this.outstanding.push(evaluation);
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      $('.resource-barchart1').sparkline([5, 6, 9, 7, 8, 4, 6], {
        type: 'bar',
        barWidth: '6px',
        height: '32px',
        barColor: '#1abc9c',
        tooltipClassname: 'abc'
      });

      $('.resource-barchart2').sparkline([6, 4, 8, 7, 9, 6, 5], {
        type: 'bar',
        barWidth: '6px',
        height: '32px',
        barColor: '#1abc9c',
        tooltipClassname: 'abc'
      });

      Morris.Area({
        element: 'morris-extra-area',
        data: [{
          period: '2010',
          iphone: 0,
          ipad: 0,
          itouch: 0
        }, {
          period: '2011',
          iphone: 50,
          ipad: 15,
          itouch: 5
        }, {
          period: '2012',
          iphone: 20,
          ipad: 50,
          itouch: 65
        }, {
          period: '2013',
          iphone: 60,
          ipad: 12,
          itouch: 7
        }, {
          period: '2014',
          iphone: 30,
          ipad: 20,
          itouch: 120
        }, {
          period: '2015',
          iphone: 25,
          ipad: 80,
          itouch: 40
        }, {
          period: '2016',
          iphone: 10,
          ipad: 10,
          itouch: 10
        }


        ],
        lineColors: ['#fb9678', '#7E81CB', '#01C0C8'],
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['Site A', 'Site B', 'Site C'],
        pointSize: 0,
        lineWidth: 0,
        resize: true,
        fillOpacity: 0.8,
        behaveLikeLine: true,
        gridLineColor: '#5FBEAA',
        hideHover: 'auto'

      });
    }, 1);
  }
}
