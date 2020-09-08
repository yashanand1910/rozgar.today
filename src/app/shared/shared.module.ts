import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from '@shared/components';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NzLayoutModule, NzTypographyModule } from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, NzLayoutModule, NzTypographyModule],
  declarations: [LoaderComponent, FooterComponent],
  exports: [LoaderComponent, FooterComponent]
})
export class SharedModule {}
