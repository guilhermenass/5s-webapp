import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(AuthRoutes),
      SharedModule
  ],
  declarations: [AuthComponent]
})

export class AuthModule {}
