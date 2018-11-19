import { Routes } from '@angular/router';

import { ReportComponent } from './report.component';

export const ReportRoutes: Routes = [{
  path: '',
  component: ReportComponent,
  data: {
    breadcrumb: 'Relatórios',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
