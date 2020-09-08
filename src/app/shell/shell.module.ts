import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { I18nModule } from '@app/i18n';
import { ShellComponent } from '@shell/components';
import { HeaderComponent } from '@shell/components';
import {
  NzAlertModule,
  NzGridModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import { ReactiveComponentModule } from '@ngrx/component';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    I18nModule,
    NzLayoutModule,
    NzGridModule,
    NzMenuModule,
    NzIconModule,
    NzAlertModule,
    NzTypographyModule,
    ReactiveComponentModule,
    SharedModule
  ],
  declarations: [HeaderComponent, ShellComponent]
})
export class ShellModule {}
