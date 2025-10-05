
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) { }
  /**
   * Payments Routes
   * @Get Wallet @param type
   * @Get All Payments @param page
   * @Get Payment By Id @param id
   * @Post Add New Payment @param body
  */

  GetWallet(type: string): Observable<any> {
    // /user/wallet?type=wallet (params)
    let httpParams = new HttpParams().set('type', type);
    return this.http.get(`${environment.baseAPIURL}/user/wallet`, { params: httpParams });
  }

  GetAllPaymentMethods(params: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return this.http.get(`${environment.baseAPIURL}/user/wallet`, { params: httpParams });
  }

  getTransactionById(walletId: string | number, transactionId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/wallet/${walletId}/transaction/${transactionId}`);
  }

  AddPaymentMethod(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/user/wallet`, data);
  }
}
