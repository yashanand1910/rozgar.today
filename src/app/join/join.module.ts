import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinRoutingModule } from './join-routing.module';
import { JoinComponent, PaymentComponent, PlansComponent } from './components';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzCascaderModule,
  NzCheckboxModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzNoAnimationModule,
  NzSelectModule,
  NzSkeletonModule,
  NzSliderModule,
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
import { JoinEffects } from './effects';
import { PlanComponent, AccountComponent, CreateAccountComponent, VerifyComponent } from '@app/join/components';
import { ReactiveComponentModule } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { EnsureFirestoreStateLoadedGuard, EnsurePlanSelectedGuard } from '@app/join/guards';

@NgModule({
  declarations: [
    JoinComponent,
    PlansComponent,
    PaymentComponent,
    PlanComponent,
    AccountComponent,
    CreateAccountComponent,
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
    EffectsModule.forFeature([JoinEffects]),
    NzSkeletonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    ReactiveComponentModule,
    NzToolTipModule,
    NzAlertModule,
    NzSpinModule,
    NzCascaderModule,
    NzSliderModule,
    NzNoAnimationModule,
    NzCheckboxModule,
    SharedModule
  ],
  providers: [EnsurePlanSelectedGuard, EnsureFirestoreStateLoadedGuard]
})
export class JoinModule {}
