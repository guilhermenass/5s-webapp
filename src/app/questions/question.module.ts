import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuestionComponent } from './question.component';
import { QuestionRoutes } from './question.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(QuestionRoutes),
    SharedModule,
  ],
  declarations: [QuestionComponent]
})

export class QuestionModule { }
