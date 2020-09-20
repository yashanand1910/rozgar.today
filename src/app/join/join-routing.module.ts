import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@shell/services';
import { JoinComponent, PaymentComponent, PlansComponent, AccountComponent } from './components';
import { extract } from '@i18n/services';
import { EnsurePlanSelectedGuard } from './guards';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: 'join',
      pathMatch: 'full'
    },
    {
      path: 'join',
      component: JoinComponent,
      children: [
        {
          path: '',
          redirectTo: 'plan',
          pathMatch: 'full'
        },
        {
          path: 'plan',
          component: PlansComponent,
          data: { title: extract('Plan') }
        },
        {
          path: 'account',
          component: AccountComponent,
          data: { title: extract('Account') }
          // canActivate: [EnsurePlanSelectedGuard]
        },
        {
          path: 'payment',
          component: PaymentComponent,
          data: { title: extract('Payment') },
          canActivate: [EnsurePlanSelectedGuard]
        }
      ]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinRoutingModule {}
