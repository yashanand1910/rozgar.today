import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { extract } from '@app/i18n/services';
import { AuthComponent, ForgotPasswordComponent, LoginComponent } from '@app/auth/components';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: { title: extract('Login') },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: extract('Forgot Password') },
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
