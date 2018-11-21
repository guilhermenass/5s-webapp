import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReportResultsComponent } from './report-results.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ReportResultsComponent],
  exports: [ReportResultsComponent]
})
export class ReportResultsModule { }
