import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { I18nModule } from '@app/i18n';
import { ShellComponent } from '@shell/components';
import { HeaderComponent } from './components/shell/header/header.component';
import { FooterComponent } from './components/shell/footer/footer.component';
import { NzAlertModule, NzGridModule, NzIconModule, NzLayoutModule, NzMenuModule } from 'ng-zorro-antd';

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
  ],
  declarations: [HeaderComponent, ShellComponent, FooterComponent],
})
export class ShellModule {}
