import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { ReferencePipe } from '@shared/pipes';
import { CreateReferencePipe } from './pipes/create-reference.pipe';

@NgModule({
  imports: [CommonModule, NzLayoutModule, NzTypographyModule],
  declarations: [FooterComponent, ReferencePipe, CreateReferencePipe],
  exports: [FooterComponent, ReferencePipe, CreateReferencePipe]
})
export class SharedModule {}
