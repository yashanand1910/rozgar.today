import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@app/auth/components';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, SignupEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
} from 'ng-zorro-antd';
import { AuthComponent } from '@auth/components';
import { ForgotPasswordComponent } from '@auth/components';
import { SharedModule } from '@shared';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    I18nModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects, SignupEffects]),
    NzGridModule,
    NzFormModule,
    NzLayoutModule,
    SharedModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
  ],
  declarations: [LoginComponent, AuthComponent, ForgotPasswordComponent],
})
export class AuthModule {}
