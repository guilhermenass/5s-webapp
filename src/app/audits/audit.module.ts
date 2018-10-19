import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuditComponent } from './audit.component';
import { AuditRoutes } from './audit.routing';
import { SharedModule } from '../shared/shared.module';
import { BrMasker4Module } from 'brmasker4';
import { SelectModule } from 'ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuditRoutes),
    SharedModule,
    BsDatepickerModule.forRoot(),
    BrMasker4Module,
    SelectModule,
    NgxDatatableModule
  ],
  declarations: [AuditComponent]
})

export class AuditModule { }
