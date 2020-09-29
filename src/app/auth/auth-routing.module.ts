import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/i18n/services';
import {
  ForgotPasswordComponent,
  LoginComponent,
  ResetPasswordComponent,
  VerifyEmailComponent
} from '@app/auth/components/auth';
import { AuthComponent } from '@auth/components';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: { title: extract('Login') }
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent,
        data: { title: extract('Verify Email') }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: extract('Forgot Password') }
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: { title: extract('Reset Password') }
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule {}
