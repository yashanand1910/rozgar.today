import { Route, Routes } from '@angular/router';

import { ShellComponent } from '@shell/components';
import { EnsureAuthStateInitializedGuard } from '@auth/guards';

/**
 * Provides helper methods to create-account routes.
 */
export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      canActivate: [EnsureAuthStateInitializedGuard],
      children: routes,
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}
