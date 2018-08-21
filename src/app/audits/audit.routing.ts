import { Routes } from '@angular/router';

import { AuditComponent } from './audit.component';

export const AuditRoutes: Routes = [{
  path: '',
  component: AuditComponent,
  data: {
    breadcrumb: 'Auditorias',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
