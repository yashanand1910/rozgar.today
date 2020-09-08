import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
// noinspection ES6PreferShortImport
import { Logger } from '../services/logger.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  // Customize the default error handler here if needed
  private static errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    throw response;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error) => ErrorHandlerInterceptor.errorHandler(error)));
  }
}
