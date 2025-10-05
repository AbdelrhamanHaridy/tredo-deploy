import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) { }

  /**
     * Orders
     * @Get All Orders @param page
     * @Get Order By Id @param id
     * @Post Add New Order @param body
     * @Patch Update Order @param id, body
     * @Delete Delete Order @param id
     * @Get Police Order By Id @param orderId
    */

  getAllOrders(page: string | number = 1, filters?: any): Observable<any> {
    const validPage = Number(page);
    const pageParam = !isNaN(validPage) && validPage > 0 ? validPage : 1;

    let params = new HttpParams().set('page', pageParam.toString());

    if (filters) {
      if (filters.from_date) params = params.set('from_date', filters.from_date);
      if (filters.to_date) params = params.set('to_date', filters.to_date);
      if (filters.awb_number) params = params.set('awb_number', filters.awb_number);
      if (filters.order_number) params = params.set('order_number', filters.order_number);
      if (filters.phone) params = params.set('phone', filters.phone);
      if (filters.shipping_company) params = params.set('shipping_company', filters.shipping_company);
    }

    return this.http.get(`${environment.baseAPIURL}/user/order`, { params });
  }

  GetOrdersByStatus(status: string, page: string | number = 1, filters?: any): Observable<any> {
    const validPage = Number(page);
    const pageParam = !isNaN(validPage) && validPage > 0 ? validPage : 1;

    let params = new HttpParams().set('page', pageParam.toString()).set('status', status);

    if (filters) {
      if (filters.from_date) params = params.set('from_date', filters.from_date);
      if (filters.to_date) params = params.set('to_date', filters.to_date);
      if (filters.awb_number) params = params.set('awb_number', filters.awb_number);
      if (filters.order_number) params = params.set('order_number', filters.order_number);
      if (filters.phone) params = params.set('phone', filters.phone);
      if (filters.shipping_company) params = params.set('shipping_company', filters.shipping_company);
    }

    return this.http.get(`${environment.baseAPIURL}/user/order`, { params });
  }

  getOrderById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/order/${id}`);
  }

  addNewOrder(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/user/order`, body);
  }

  updateOrder(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/user/order/${id}`, body);
  }

  deleteOrderById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/user/order/${id}`);
  }

  getPoliceOrderById(orderId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/order/${orderId}/police`);
  }
}
