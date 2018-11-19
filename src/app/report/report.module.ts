import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { RouterModule } from '@angular/router';
import { ReportRoutes } from './report.routing';
import { SharedModule } from '../shared/shared.module';
import { ReportResultsModule } from '../report-results/report-results.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
    SharedModule,
    ReportResultsModule
  ],
  declarations: [ReportComponent]
})
export class ReportModule { }
