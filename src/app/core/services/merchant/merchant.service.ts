import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  constructor(private http: HttpClient) { }

  GetOrderStatisticsByMerchantId(actionPeriod: number, merchantId: number) {
    return this.http.get(`${environment.baseAPIURL}/order/actionPeriod/${actionPeriod}/merchant/${merchantId}/GetOrderStatistics`);
  }

  getAllMerchant(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Merchant/GetMerchantsInfo`);
  }

  /**
   * Analysis
   * @Get Home Page Data
  */
  // /user/analytics
  getAnalyticsData(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/analytics`);
  }

  /**
   * Geo Services
   * @Get All Countries
   * @Get All Cities
   * @Get All Areas
  */

  getAllCountries(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country?collection`);
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

  /**
   * Customers
   * @Get All Customers
   * @Get Customer By Id
   * @Get Download Customers File
   * @Post Upload Customers File
   * @Post Add New Customer
   * @Patch Update Customer
   * @Delete Delete Customer
  */

  getAllCustomers(page: string | number = 1, filters?: any): Observable<any> {
    const validPage = Number(page);
    const pageParam = (!isNaN(validPage) && validPage > 0 ? validPage : 1);

    let params = new HttpParams().set('page', pageParam.toString());

    if (filters) {
      if (filters.phone) {
        params = params.set('phone', filters.phone);
      }
      if (filters.city_id) {
        params = params.set('city_id', filters.city_id.toString());
      }
      if (filters.area_id) {
        params = params.set('area_id', filters.area_id.toString());
      }
      if (filters.from_date) {
        params = params.set('from_date', filters.from_date);
      }
      if (filters.to_date) {
        params = params.set('to_date', filters.to_date);
      }
    }

    return this.http.get(`${environment.baseAPIURL}/user/customer`, { params });
  }

  getCustomerCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/customer?collection`);
  }

  getCustomerById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/customer/${id}`);
  }

  downloadCustomersFile(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/download-excel-template`, { responseType: 'blob' });
  }

  uploadCustomersFile(body: any): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/upload-customers`, body);
  }

  addNewCustomer(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/user/customer`, body);
  }

  updateCustomer(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/user/customer/${id}`, body);
  }

  deleteCustomerById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/user/customer/${id}`);
  }

  /**
 * WareHouses
 * @Get All WareHouses @param page
 * @Get WareHouse By Id @param id
 * @Post Add New WareHouse @param body
 * @Patch Update WareHouse @param id, body
 * @Delete Delete WareHouse @param id
*/
  // user/ware-house

  /* getAllWareHouses(page: string | number = 1, filters?: any): Observable<any> {
    const pageParam = Math.max(1, Number(page)) || 1;
    let params = new HttpParams().set('page', pageParam.toString());

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, String(value));
        }
      });
    }

    return this.http.get(`${environment.baseAPIURL}/user/ware-house`, { params });
  } */

  getAllWareHouses(page: string | number = 1, filters?: any): Observable<any> {
    const validPage = Number(page);
    const pageParam = (!isNaN(validPage) && validPage > 0 ? validPage : 1);

    // Initialize HttpParams with the page parameter
    let params = new HttpParams().set('page', pageParam.toString());

    // Add filter parameters if they exist
    if (filters) {
      if (filters.name) {
        params = params.set('name', filters.name);
      }
      if (filters.admin) {
        params = params.set('admin', filters.admin);
      }
      if (filters.phone) {
        params = params.set('phone', filters.phone);
      }
      if (filters.city_id) {
        params = params.set('city_id', filters.city_id.toString());
      }
      if (filters.area_id) {
        params = params.set('area_id', filters.area_id.toString());
      }
      if (filters.from_date) {
        params = params.set('from_date', filters.from_date);
      }
      if (filters.to_date) {
        params = params.set('to_date', filters.to_date);
      }
    }

    return this.http.get(`${environment.baseAPIURL}/user/ware-house`, { params });
  }

  getWareHouseCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/ware-house?collection`);
  }

  getWareHouseById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/ware-house/${id}`);
  }

  addNewWareHouse(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/user/ware-house`, body);
  }

  updateWareHouse(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/user/ware-house/${id}`, body);
  }

  deleteWareHouseById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/user/ware-house/${id}`);
  }


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

  /**
   * Zones Routes
   * @Get Collection of Zones @param shippingCompanyId @param collection
   * @Get All Zones @param shippingCompanyId @param page
   * @Get Zone By Id @param shippingCompanyId @param id
  */


  getZonesCollection(shippingCompanyId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${shippingCompanyId}/zoom?collection`);
  }

  getAllZones(shippingCompanyId: string | number, page: string | number = 1): Observable<any> {
    const validPage = Number(page);
    const pageParam = !isNaN(validPage) && validPage > 0 ? validPage : 1;

    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${shippingCompanyId}/zoom?page=${pageParam}`);
  }

  getZoneById(shippingCompanyId: string | number, id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${shippingCompanyId}/zoom/${id}`);
  }

  /**
   * Type in Zones
   * @Get Collection of Types in Zone @param zoneId @param collection
   * @Get Types in Zone @param zoneId
   * @Get Type in Zone By Id @param zoneId @param id
  */

  getTypeInZoneCollection(zoneId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/zoom/${zoneId}/type?collection`);
  }

  getTypeInZone(zoneId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/zoom/${zoneId}/type`);
  }

  getTypeInZoneById(zoneId: string | number, id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/zoom/${zoneId}/type/${id}`);
  }

  /**
   * Shipments
   * @Get All Shipments @param collection
   * @Get Shipment By Id @param id
  */

  getShipmentsCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipment?collection`);
  }

  getShipmentById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipment/${id}`);
  }


  /**
   * Profile Settings
   * @Get Profile Settings @param page
   * @Post Update Profile Settings @param body
   * @Delete Delete Profile Settings @param id
   * @Post Update Password @param body
  */

  getProfile(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/profile`);
  }

  updateMerchant(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/profile/1?_method=PATCH`, body);
  }

  GetInit() {
    return this.http.get<any>(`${environment.baseAPIURL}/get_init`);
  }

  updatePassword(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/profile`, body);
  }

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

  /**
   * Shipping Companies Routes
   * @Get All Shipping Companies @param collection
   * @Get Shipping Company By Id @param id
  */

  getShippingCompaniesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company?collection`);
  }

  getShippingCompanyById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${id}`);
  }


  /**
   * Not Works
  */



  CancelOrder(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Operations/CancelOrder/${id}`);
  }

  getMerchentOrders(merchantId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Operations/GetMerchentOrders/${merchantId}`);
  }

}
