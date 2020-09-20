import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { NzLayoutModule, NzTypographyModule } from 'ng-zorro-antd';
import { ReferencePipe } from '@shared/pipes';

@NgModule({
  imports: [CommonModule, NzLayoutModule, NzTypographyModule],
  declarations: [FooterComponent, ReferencePipe],
  exports: [FooterComponent, ReferencePipe]
})
export class SharedModule {}
