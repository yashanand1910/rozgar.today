import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@shell/services';
import { JoinComponent, PaymentComponent, PlansComponent } from './components';
import { extract } from '@i18n/services';
import { ProfileComponent } from './components/join/profile/profile.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      component: JoinComponent,
      children: [
        {
          path: '',
          redirectTo: 'plan',
          pathMatch: 'full',
        },
        {
          path: 'plan',
          component: PlansComponent,
          data: { title: extract('Select a Plan') },
        },
        {
          path: 'profile',
          component: ProfileComponent,
          data: { title: extract('Setup Profile') },
        },
        {
          path: 'payment',
          component: PaymentComponent,
          data: { title: extract('Payment') },
        },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinRoutingModule {}
