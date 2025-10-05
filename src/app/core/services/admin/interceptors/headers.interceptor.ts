import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AdminService } from '../admin.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);
  authService: any;
  constructor(private adminService: AdminService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(request))
      .pipe(
        catchError((requestError: HttpErrorResponse) => {
          if (requestError && requestError.status === 401) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject.pipe(
                filter((result: any) => result),
                take(1),
                switchMap(() => next.handle(this.addAuthToken(request)))
              );
            } else {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);
              return this.adminService.refreshAuthToken().pipe(
                switchMap((token) => {
                  this.refreshTokenSubject.next(token);
                  return next.handle(this.addAuthToken(request));
                }),
                finalize(() => (this.refreshTokenInProgress = false))
              );
            }
          } else {
            return throwError(() => new Error(requestError.message));
          }
        })
      )
  }
  addAuthToken(request: HttpRequest<any>) {
    const token = this.authService.getAuthToken();
    if (!token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
