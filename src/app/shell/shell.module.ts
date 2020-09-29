import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { I18nModule } from '@app/i18n';
import { ShellComponent } from '@shell/components';
import { HeaderComponent } from '@shell/components';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
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
    SharedModule,
    NzSpinModule
  ],
  declarations: [HeaderComponent, ShellComponent]
})
export class ShellModule {}
