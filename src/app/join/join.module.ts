import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinRoutingModule } from './join-routing.module';
import { JoinComponent } from './components';
import {
  NzButtonModule,
  NzCardModule,
  NzGridModule,
  NzIconModule,
  NzListModule,
  NzSkeletonModule,
  NzStepsModule,
  NzTagModule,
  NzTypographyModule,
} from 'ng-zorro-antd';
import { PlansComponent } from './components';
import { SetupProfileComponent } from './components';
import { PaymentComponent } from './components';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromJoin from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { JoinEffects, PlanEffects } from './effects';
import { PlanComponent } from './components/join/plans/plan/plan.component';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [JoinComponent, PlansComponent, SetupProfileComponent, PaymentComponent, PlanComponent],
  imports: [
    CommonModule,
    JoinRoutingModule,
    NzStepsModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzListModule,
    TranslateModule,
    NzTypographyModule,
    NzTagModule,
    NzButtonModule,
    StoreModule.forFeature(fromJoin.joinFeatureKey, fromJoin.reducers),
    EffectsModule.forFeature([JoinEffects, PlanEffects]),
    NzSkeletonModule,
    ReactiveComponentModule,
  ],
})
export class JoinModule {}
