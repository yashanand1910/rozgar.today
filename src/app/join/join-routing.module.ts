import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@shell/services';
import { JoinComponent } from './components';
import { PlansComponent } from './components';
import { SetupProfileComponent } from './components';
import { PaymentComponent } from './components';
import { extract } from '@i18n/services';

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
          component: SetupProfileComponent,
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
