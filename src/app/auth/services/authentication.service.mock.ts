import { Observable, of } from 'rxjs';

import { LoginContext } from '@app/auth/services';
import { Credentials } from '@app/auth/services';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    username: 'test',
    token: '123',
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      username: context.username,
      token: '123456',
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
