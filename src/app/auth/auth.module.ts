import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '@app/auth/components';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { SignupEffects } from './effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    I18nModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects, SignupEffects]),
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}
