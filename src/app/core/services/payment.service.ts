import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) { }
  /**
   *
   * @param amount
   * @param description
   * @param orderId
   * @param merchantId
   * @returns
   */
  createTransAction(
    amount: any,
    description: any,
    orderId: any,
    merchantId: any
  ): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${environment.baseAPIURL}/Financial/CreateTransaction`,
      {
        amount: amount,
        description: description,
        orderId: orderId,
        merchantId: merchantId,
      }
    );
  }

  /**
   * @param amount
   * @param id
   * @param toke
   */
  updateSuccessTransaction(amount: any, id: any, token: any) {
    return this.http.post(
      `${environment.baseAPIURL}/Financial/UpdateSuccessTransaction`,
      {
        token: token,
        id: id,
        amount: amount,
      }
    );
  }
}
