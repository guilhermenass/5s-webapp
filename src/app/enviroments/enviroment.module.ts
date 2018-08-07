import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EnviromentComponent } from './enviroment.component';
import { EnviromentRoutes } from './enviroment.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EnviromentRoutes),
    SharedModule
  ],
  declarations: [EnviromentComponent]
})

export class EnviromentModule { }
