import { Routes } from '@angular/router';

import { UnitComponent } from './unit.component';

export const UnitRoutes: Routes = [{
  path: '',
  component: UnitComponent,
  data: {
    breadcrumb: 'Unidades',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
