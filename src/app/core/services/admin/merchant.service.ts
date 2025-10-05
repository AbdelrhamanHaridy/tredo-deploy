import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CustomerDto } from '../../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  getCuurentMerchantInfo(merchentId: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }


  getMerchantCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/user?collection`);
  }

  getAllMerchant(page?: number, name?: string, phone?: string): Observable<any> {
    let params = new HttpParams();

    if (page) {
      params = params.set('page', page.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    if (phone) {
      params = params.set('phone', phone);
    }

    return this.http.get(`${environment.baseAPIURL}/admin/user`, { params });
  }

  getMerchantById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/user/${id}`);
  }

  deleteMerchantById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/user/${id}`);
  }

  addNewMerchant(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/user`, body);
  }

  updateMerchant(id: string | number, body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/user/${id}?_method=PATCH`, body);
  }

  updateMerchantPassword(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/change-password-merchent`, body);
  }

  getCountryCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country?collection`);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country`);
  }

  getCitiesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city?collection`);
  }

  getAllCities(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city`);
  }

  getAreasCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area?collection`);
  }

  getAllAreas(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area`);
  }

  GetInit() {
    return this.http.get<any>(`${environment.baseAPIURL}/get_init`);
  }

  GetCustomersCollection(user?: number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/customer?user=${user}&collection`);
  }

  GetAllCustomers(user?: number): Observable<any> {
    let params;
    if (user) {
      params = new HttpParams()
        .set('user', user.toString());
    }
    return this.http.get(`${environment.baseAPIURL}/admin/customer`, { params });
  }

  GetCustomerById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/customer/${id}`);
  }

  DeleteCustomerById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/customer/${id}`);
  }

  AddNewCustomer(body: any): Observable<CustomerDto> {
    body = {
      ...body,
      user_id: new Number(body.user_id),
      city_id: new Number(body.city_id),
      area_id: new Number(body.area_id),
    }
    return this.http.post<any>(`${environment.baseAPIURL}/admin/customer`, body);
  }

  UpdateCustomer(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/admin/customer/${id}`, body);
  }

  DeletePriceListById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/price-list/${id}`);
  }

  DownloadCustomersFile(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/download-excel-template`);
  }

  UploadCustomersFile(body: any): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/upload-customers`, body);
  }

  GetWareHousesByMerchantId(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/user/${id}/ware-house?collection`);
  }

  AddWareHouse(id: string | number, body: any): Observable<any> {
    return this.http.post(`${environment.baseAPIURL}/admin/user/${id}/ware-house`, body);
  }

  GetWareHouseById(merchantId: string | number, id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/user/${merchantId}/ware-house/${id}`);
  }

  DeleteWareHouseById(merchantId: string | number, id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/user/${merchantId}/ware-house/${id}`);
  }

  UpdateWareHouse(merchantId: string | number, id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/admin/user/${merchantId}/ware-house/${id}`, body);
  }

  /**
   * Orders Routes
   * @Post AddOrder @param body
   * @Get GetAllOrders @param page
   * @Get GetAllOrdersByMerchantId @param id
   * @Get GetOrderById @param id
   * @Delete DeleteOrderById @param id
   * @Patch UpdateOrder @param id
  */

  AddOrder(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/order`, body);
  }

  GetAllOrders(page?: number, status?: string, user?: string, search?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (status) {
      params = params.set('status', status);
    }
    if (user) {
      params = params.set('user', user);
    }
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get(`${environment.baseAPIURL}/admin/order`, { params });
  }

  GetOrdersByStatus(status: string, page?: number, user?: string, search?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (user) {
      params = params.set('user', user);
    }
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get(`${environment.baseAPIURL}/admin/order?status=${status}`, { params });
  }

  GetAllOrdersByMerchantId(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/order?user=${id}`);
  }

  GetOrderById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/order/${id}`);
  }

  DeleteOrderById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/order/${id}`);
  }

  UpdateOrder(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/admin/order/${id}`, body);
  }


  /**
   * To Edit
  */
  TrackOrderWithAction(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Operations/TrackOrderWithAction/${id}`);
  }

  CancelOrder(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Operations/CancelOrder/${id}`);
  }

  /**
  * To Edit
 */

}
