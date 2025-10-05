// payment.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) { }

  /**
   * Payment Routes
   * @Get All Payment Methods
   * @Add New Payment Method
   *
  */

  GetAllPaymentMethods(id: number | string, params: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return this.http.get(`${environment.baseAPIURL}/admin/user/${id}/wallet`, { params: httpParams });
  }

  AddPaymentMethod(id: number | string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/user/${id}/wallet`, data);
  }

  /**
   * Transaction Routes
   * @Get Single Transaction
   * @Delete Single Transaction
   * @Update Single Transaction
  */

  // admin/wallet/1/transaction/5

  GetSingleTransaction(walletId: number | string, transactionId: number | string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/wallet/${walletId}/transaction/${transactionId}`);
  }

  DeleteTransaction(walletId: number | string, transactionId: number | string): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/wallet/${walletId}/transaction/${transactionId}`);
  }

  UpdateTransaction(walletId: number | string, transactionId: number | string, data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/wallet/${walletId}/transaction/${transactionId}?_method=PATCH`, data);
  }
}
