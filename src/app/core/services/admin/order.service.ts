import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) { }

  getOrdersShip() {
    return this.http.get(`${environment.baseAPIURL}/Order/GetOrdersShip`);
  }

  GetOrderStatistics(actionPeriod: number) {
    return this.http.get(`${environment.baseAPIURL}/order/actionPeriod/${actionPeriod}/GetOrderStatistics`);
  }

  GetOrdersByActionPeriodAndStatus(actionPeriod: number, status: any) {
    return this.http.get(`${environment.baseAPIURL}/Order/GetOrdersShipByActionStatus/${actionPeriod}/${status}`);
  }
}
