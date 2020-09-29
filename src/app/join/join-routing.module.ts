import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@shell/services';
import { PaymentComponent, PlansComponent, AccountComponent } from './components/join';
import { extract } from '@i18n/services';
import { EnsureFirestoreStateLoadedGuard, EnsurePlanSelectedGuard } from './guards';
import { AuthGuard, EnsureAccountVerifiedGuard } from '@auth/guards';
import { StepPath } from '@app/join/models';
import { JoinComponent } from '@app/join/components';

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
          path: StepPath.Plan,
          component: PlansComponent,
          data: { title: extract('Plan') }
        },
        {
          path: StepPath.Account,
          component: AccountComponent,
          data: { title: extract('Account') },
          canActivate: [EnsurePlanSelectedGuard]
        },
        {
          path: StepPath.Payment,
          component: PaymentComponent,
          data: { title: extract('Payment') },
          canActivate: [AuthGuard, EnsurePlanSelectedGuard, EnsureAccountVerifiedGuard]
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
