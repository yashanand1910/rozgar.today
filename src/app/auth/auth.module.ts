import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@app/auth/components';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthEffects,
  SignupEffects,
  ForgotPasswordEffects,
  LoginEffects,
  ResetPasswordEffects,
  VerifyEmailEffects
} from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzAlertModule,
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzLayoutModule,
  NzResultModule,
  NzSpinModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import { AuthComponent, ForgotPasswordComponent, ResetPasswordComponent, VerifyEmailComponent } from '@auth/components';
import { SharedModule } from '@shared';
import { ReactiveComponentModule } from '@ngrx/component';
import { AuthRedirectResolver } from '@auth/resolvers';
import { AuthGuard } from '@auth/guards';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    I18nModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([
      AuthEffects,
      SignupEffects,
      LoginEffects,
      ForgotPasswordEffects,
      ResetPasswordEffects,
      VerifyEmailEffects
    ]),
    NzGridModule,
    NzFormModule,
    NzLayoutModule,
    SharedModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    NzIconModule,
    ReactiveComponentModule,
    NzAlertModule,
    NzSpinModule,
    NzTypographyModule,
    NzResultModule
  ],
  declarations: [LoginComponent, AuthComponent, ForgotPasswordComponent, ResetPasswordComponent, VerifyEmailComponent],
  providers: [AuthRedirectResolver, AuthGuard]
})
export class AuthModule {}
