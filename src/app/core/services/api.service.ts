import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  options = {}
  private ApiUrl = environment.baseAPIURL;

  // User: any = this.authorizationService.GetLoggedInUser() != null ? this.authorizationService.GetLoggedInUser() : null;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',

    'Language': localStorage.getItem('language') || "en",
  });
  constructor(
    private httpClient: HttpClient
    // , private authorizationService: AuthorizationService
  ) {
    // this.User = this.authorizationService.GetLoggedInUser() != null ? this.authorizationService.GetLoggedInUser() : null;
    // if (this.User) {
    //   let token = this.User.UserToken?.Token ?? this.User.AccessToken ?? this.User.Token;
    //   this.headers = this.headers.set('Token', token);
    // }
  }

  get<TResponse>(url: string): Observable<TResponse>;
  get<TResponse>(url: string, params: any): Observable<TResponse>;
  get<TResponse>(url: string, params?: any): Observable<TResponse> {
    let httpParams = this.buildParams(params);
    return this.httpClient.get<TResponse>(`${this.ApiUrl}${url}`, {
      params: httpParams.params,
      // observe: 'response',
      headers: this.headers,
    }).pipe(
      catchError((err: any, caught: Observable<any>) => {
        return throwError(() => this.generalErrorHandler(err, caught))
      }));
  }

  post<TResponse>(url: string, body?: {}): Observable<TResponse> {

    return this.httpClient.post<TResponse>(`${this.ApiUrl}${url}`, body, {
      headers: this.headers
    })
      .pipe(
        catchError((err: any, caught: Observable<any>) => {
          return throwError(() => this.generalErrorHandler(err, caught))
        }));
  }
  postFile(url: string, body: {}): Observable<any> {

    let headers = new HttpHeaders({
      "ContentDisposition": "form-data",
      'Language': localStorage.getItem('language') || "en",
    })
    return this.httpClient.post<any>(`${this.ApiUrl}${url}`, body, {
      headers: headers,
      withCredentials: false
    });
  }

  delete<TResponse>(url: string): Observable<TResponse> {
    return this.httpClient.delete<TResponse>(`${this.ApiUrl}${url}`, {
      headers: this.headers
      , withCredentials: false
    });
  }
  generalErrorHandler(error: any, caught: Observable<any>): Observable<any> {
    if (error && error.error && (error.error.status == 403 || error.error.status == 401)) {
      localStorage.removeItem("AdminUser");
      // window.location.href = Config.adminLogin;
      return error;
    }
    return error;
  }
  getFile(url: string): Observable<any> {
    return this.httpClient.get(`${this.ApiUrl}${url}`, {
      headers: this.headers,
      withCredentials: false,
      responseType: 'blob'
    });

  }

  private buildParams(params: any) {
    let httpParams = {};
    if (params) {
      let qrParams = params || {};
      for (let p3 in qrParams) {
        if (qrParams[p3] == undefined || qrParams[p3] == null)
          delete qrParams[p3];
      }
      httpParams = qrParams;
    }
    return { params: httpParams }
  }
  getMerchantData(id: any) {
    return this.httpClient.get(`${environment.baseAPIURL}/Merchant/GetMerchantInfo/${id}`)
  }

}
