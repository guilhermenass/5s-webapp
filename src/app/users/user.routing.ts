import { Routes } from '@angular/router';

import { UserComponent } from './user.component';

export const UserRoutes: Routes = [{
  path: '',
  component: UserComponent,
  data: {
    breadcrumb: 'Usuários',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
