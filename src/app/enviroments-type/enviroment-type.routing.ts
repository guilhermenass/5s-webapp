import { Routes } from '@angular/router';

import { EnviromentTypeComponent } from './enviroment-type.component';

export const EnviromentTypeRoutes: Routes = [{
  path: '',
  component: EnviromentTypeComponent,
  data: {
    breadcrumb: 'Tipo de Ambiente',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
