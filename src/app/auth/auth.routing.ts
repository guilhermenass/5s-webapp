import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AuthRoutes: Routes = [{
  path: '',
  component: AuthComponent,
  data: {
    breadcrumb: 'Auth',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
