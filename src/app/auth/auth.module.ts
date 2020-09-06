import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@app/auth/components';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects, LoginEffects, SignupEffects } from './effects';
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
} from 'ng-zorro-antd';
import { AuthComponent, ForgotPasswordComponent } from '@auth/components';
import { SharedModule } from '@shared';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    I18nModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects, SignupEffects, LoginEffects]),
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
  ],
  declarations: [LoginComponent, AuthComponent, ForgotPasswordComponent],
})
export class AuthModule {}
