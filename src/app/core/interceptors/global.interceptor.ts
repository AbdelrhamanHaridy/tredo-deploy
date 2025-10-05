/* import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add authorization header if token exists
    request = request.clone({
      setHeaders: {
        'X-SECRET-KEY': `${environment.SECRETKEY}`,
        // 'X-Language': 'en',
      }
    });

    // Log the request
    return next.handle(request).pipe(
      tap(event => {
        // Log successful responses

      }),
      catchError((error: HttpErrorResponse) => {
        // Log and handle errors
        console.error(`[HTTP Error] ${request.method} ${request.url}`, error);

        // Handle specific error messages
        if (error.error?.message?.toLowerCase().includes('invalid token') ||
          error.error?.error?.toLowerCase().includes('invalid token')) {
          localStorage.removeItem('token');
          this.router.navigate(['/auth/admin']);
          return throwError(() => error);
        }

        // Handle errors based on status codes
        switch (error.status) {
          case 401:
          case 200:
          case 404:
          case 403:
            // localStorage.removeItem('token');
            // this.router.navigate(['/auth/login']);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unauthorized', life: 5000 });
            break;

          //  case 404:
          //   this.router.navigate(['/not-found']);
          //   break;

          case 422: // Validation Error
            if (error.error?.message === 'The selected userName is invalid.') {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'اسم المستخدم غير صحيح', life: 5000 });
            } else {
              const validationMessage = error.error?.message || 'Validation failed';
              console.warn('Validation Error:', validationMessage);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: validationMessage, life: 5000 });
            }
            break;

          case 500: // Server Error
            console.error('Server Error:', error.error);
            // this.router.navigate(['/error']);
            break;

          default:
            console.error('An unexpected error occurred:', error);
            break;
        }
        return throwError(() => error);
      })

    );
  }
}
 */

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const GlobalInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const messageService = inject(MessageService);

  const lang = localStorage.getItem('language') || 'en';

  req = req.clone({
    setHeaders: {
      'X-SECRET-KEY': `${environment.SECRETKEY}`,
      'X-Language': lang,
    },
  });

  // console.log(`[HTTP Request] ${req.method} ${req.url}`);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(`[HTTP Error] ${req.method} ${req.url}`, error);

      // Handle token errors
      if (
        error.error?.message?.toLowerCase().includes('invalid token') ||
        error.error?.error?.toLowerCase().includes('invalid token')
      ) {
        localStorage.removeItem('token');
        router.navigate(['/auth/admin']);
        return throwError(() => error);
      }

      // Handle other errors
      switch (error.status) {
        case 401:
        case 403:
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Unauthorized',
          });
          break;
        case 422:
          handleValidationError(error, messageService);
          break;
        case 500:
          console.error('Server Error:', error.error);
          break;
        default:
          console.error('Unexpected error:', error);
      }
      return throwError(() => error);
    })
  );
};

function handleValidationError(
  error: HttpErrorResponse,
  messageService: MessageService
) {
  if (error.error?.message === 'The selected userName is invalid.') {
    messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'اسم المستخدم غير صحيح',
      life: 5000,
    });
  } else {
    const msg = error.error?.message || 'Validation failed';
    messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: msg,
      life: 5000,
    });
  }
}
