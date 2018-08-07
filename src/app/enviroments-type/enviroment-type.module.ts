import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EnviromentTypeComponent } from './enviroment-type.component';
import { EnviromentTypeRoutes } from './enviroment-type.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EnviromentTypeRoutes),
    SharedModule
  ],
  declarations: [EnviromentTypeComponent]
})

export class EnviromentTypeModule { }
