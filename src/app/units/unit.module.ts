import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UnitComponent } from './unit.component';
import { UnitRoutes } from './unit.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UnitRoutes),
    SharedModule
  ],
  declarations: [UnitComponent]
})

export class UnitModule { }
