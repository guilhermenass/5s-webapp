import { Routes } from '@angular/router';

import { EnviromentComponent } from './enviroment.component';

export const EnviromentRoutes: Routes = [{
  path: '',
  component: EnviromentComponent,
  data: {
    breadcrumb: 'Ambientes',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
