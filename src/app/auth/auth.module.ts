import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import {
  AuthComponent,
  ForgotPasswordComponent,
  LoginComponent,
  ResetPasswordComponent,
  VerifyEmailComponent
} from './components';
import { EffectsModule } from '@ngrx/effects';
import {
  AuthEffects,
  ForgotPasswordEffects,
  LoginEffects,
  ResetPasswordEffects,
  SignupEffects,
  VerifyEmailEffects
} from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { SharedModule } from '@shared';
import { ReactiveComponentModule } from '@ngrx/component';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '@env/environment';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    provideAuth(() => {
      const auth = getAuth();
      if (environment.firebase.emulator.active) {
        connectAuthEmulator(auth, environment.firebase.emulator.authURL);
      }
      return auth;
    }),
    I18nModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducers),
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
  declarations: [LoginComponent, AuthComponent, ForgotPasswordComponent, ResetPasswordComponent, VerifyEmailComponent]
})
export class AuthModule {}
