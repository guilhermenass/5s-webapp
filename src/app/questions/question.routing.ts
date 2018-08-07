import { Routes } from '@angular/router';
import { QuestionComponent } from './question.component';

export const QuestionRoutes: Routes = [{
  path: '',
  component: QuestionComponent,
  data: {
    breadcrumb: 'Perguntas',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
