import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'join',
    loadChildren: () => import('./join/join.module').then((m) => m.JoinModule)
  },
  // Fallback route when no routes match
  {
    path: '**',
    redirectTo: 'join'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
