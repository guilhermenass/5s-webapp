import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import {CardRefreshDirective} from './card/card-refresh.directive';
import {CardToggleDirective} from './card/card-toggle.directive';
import { CardComponent } from './card/card.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ParentRemoveDirective} from './elements/parent-remove.directive';
import {PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../spinner/spinner.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ClickOutsideModule} from 'ng-click-outside';
import {NgDatepickerModule} from 'ng2-datepicker';
import { SelectModule } from 'ng-select';

@NgModule({
  imports: [
      CommonModule,
      NgDatepickerModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
      PaginationModule.forRoot(),
      SimpleNotificationsModule.forRoot(),
      ClickOutsideModule,
      SelectModule
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
      ToggleFullscreenDirective,
      CardRefreshDirective,
      CardToggleDirective,
      ParentRemoveDirective,
      CardComponent,
      SpinnerComponent
  ],
  exports: [

    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
      ToggleFullscreenDirective,
      CardRefreshDirective,
      CardToggleDirective,
      ParentRemoveDirective,
      CardComponent,
      SpinnerComponent,
      NgbModule,
      PaginationModule,
      FormsModule,
      ReactiveFormsModule,
      SimpleNotificationsModule,
      ClickOutsideModule,
      NgDatepickerModule,
      SelectModule
  ],
  providers: [
      MenuItems
  ]
})
export class SharedModule { }
