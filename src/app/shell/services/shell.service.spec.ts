import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from '@auth/services';
import { MockAuthenticationService } from '@app/auth/services/authentication.service.mock';
import { ShellComponent } from '@shell/components';
import { Shell } from './shell.service';
import { AuthenticationGuard } from '@auth/guards';

describe('Shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellComponent],
      providers: [AuthenticationGuard, { provide: AuthenticationService, useClass: MockAuthenticationService }]
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Shell.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(ShellComponent);
    });
  });
});
