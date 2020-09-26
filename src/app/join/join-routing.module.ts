import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@shell/services';
import { JoinComponent, PaymentComponent, PlansComponent, AccountComponent } from './components';
import { extract } from '@i18n/services';
import { EnsureFirestoreStateLoadedGuard, EnsurePlanSelectedGuard } from './guards';
import { AuthGuard } from '@auth/guards';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: 'join',
      pathMatch: 'full'
    },
    {
      path: 'join',
      canActivate: [EnsureFirestoreStateLoadedGuard],
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
          data: { title: extract('Account') },
          canActivate: [EnsurePlanSelectedGuard]
        },
        {
          path: 'payment',
          component: PaymentComponent,
          data: { title: extract('Payment') },
          canActivate: [AuthGuard, EnsurePlanSelectedGuard]
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
