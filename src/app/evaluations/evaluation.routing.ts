import { Routes } from '@angular/router';

import { EvaluationComponent } from './evaluation.component';

export const EvaluationRoutes: Routes = [{
  path: '',
  component: EvaluationComponent,
  data: {
    breadcrumb: 'Avaliações',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
