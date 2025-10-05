import { HttpInterceptorFn } from "@angular/common/http";
import { LoaderService } from "../../loader.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs";

/* import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../loader.service';
// import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  //,private spinner: NgxSpinnerService
  constructor(private loaderService: LoaderService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // this.spinner.show();

    return next.handle(request).pipe(
      finalize(
        () => {
          // this.spinner.hide()
        }
      ),
    );
  }
}
 */
export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.show(); // Implement show/hide in your service

  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};
