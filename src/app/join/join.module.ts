import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinRoutingModule } from './join-routing.module';
import { PaymentComponent, PlansComponent } from './components/join';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import * as fromJoin from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { JoinEffects } from './effects';
import { JoinComponent, StepComponent } from '@app/join/components';
import { ReactiveComponentModule } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { EnsureFirestoreStateLoadedGuard, EnsurePlanSelectedGuard } from '@app/join/guards';
import {
  AccountComponent,
  CreateAccountComponent,
  PlanComponent,
  VerifyAccountComponent
} from '@app/join/components/join';

@NgModule({
  declarations: [
    JoinComponent,
    PlansComponent,
    PaymentComponent,
    PlanComponent,
    AccountComponent,
    CreateAccountComponent,
    VerifyAccountComponent,
    StepComponent
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
    SharedModule,
    NzResultModule
  ],
  providers: [EnsurePlanSelectedGuard, EnsureFirestoreStateLoadedGuard]
})
export class JoinModule {}
