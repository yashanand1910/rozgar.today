import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinRoutingModule } from './join-routing.module';
import { JoinComponent, PaymentComponent, PlansComponent } from './components';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzSelectModule,
  NzSkeletonModule,
  NzSpinModule,
  NzStepsModule,
  NzTagModule,
  NzToolTipModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromJoin from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { JoinEffects, PlanEffects } from './effects';
import { PlanComponent } from './components/join/plans/plan/plan.component';
import { ReactiveComponentModule } from '@ngrx/component';
import { AccountComponent } from './components/join/account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './components/join/account/create/create.component';
import { VerifyComponent } from './components/join/account/verify/verify.component';

@NgModule({
  declarations: [
    JoinComponent,
    PlansComponent,
    PaymentComponent,
    PlanComponent,
    AccountComponent,
    CreateComponent,
    VerifyComponent
  ],
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
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    ReactiveComponentModule,
    NzToolTipModule,
    NzAlertModule,
    NzSpinModule
  ]
})
export class JoinModule {}
