import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) { }
  GetInit() {
    return this.http.get<any>(`${environment.baseAPIURL}/get_init`);
  }
  /* addCompany(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/'+ 'companies', data);
  } */
  addVendor(data: any, id: string): Observable<any> {
    if (!data.vendorZones[1]?.endRecivingTime) {
      data.vendorZones = data.vendorZones.slice(0, 1);
    } else if (!data.vendorZones[2]?.endRecivingTime) {
      data.vendorZones = data.vendorZones.slice(0, 2);
    } else if (!data.vendorZones[3]?.endRecivingTime) {
      data.vendorZones = data.vendorZones.slice(0, 3);
    }

    if (data.vendorZones[0].vendorInfoId !== 0) {
      data.vendorZones.forEach((element: any, index: string | number) => {
        data.vendorZones[index].vendorInfoId = data.vendorZones[0].vendorInfoId
      });
    }
    data.id = id;
    return this.http.post(
      `${environment.baseAPIURL}/Vendor/PostVendorInfo`,
      data
    );
  }

  getAllVendors(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Vendor/GetVendorsInfo`);
  }
  GetVendorsInfoLite(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Vendor/GetVendorsInfoLite`);
  }

  /**
   * Profile Change Password
  */

  changePassword(data: any): Observable<any> {
    return this.http.post(`${environment.baseAPIURL}/profile`, data);
  }

  /*
    * Countries Routes
  */

  getCountriesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country?collection`);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country`);
  }

  getCountryById(id: string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country/${id}`);
  }

  deleteCountry(id: string) {
    return this.http.delete(`${environment.baseAPIURL}/country/${id}`);
  }

  addCountry(data: any, id: string) {
    data.id = id;
    return this.http.post(`${environment.baseAPIURL}/country`, data);
  }

  updateCountry(data: any, id: string) {
    return this.http.patch(`${environment.baseAPIURL}/country/${id}`, data);
  }

  /*
   * Cities Routes
  */

  getCitiesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city?collection`);
  }

  getAllCities(page?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${environment.baseAPIURL}/city`, { params });
  }

  getCitiesByCountry(country: number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city?country=${country}`);
  }

  getCityById(id: string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city/${id}`);
  }

  deleteCity(id: string) {
    return this.http.delete(`${environment.baseAPIURL}/city/${id}`);
  }

  addCity(data: { status: any; }) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.post(`${environment.baseAPIURL}/city`, data);
  }

  updateCity(data: any, id: string) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.patch(`${environment.baseAPIURL}/city/${id}`, data);
  }

  /*
    * Areas Routes
  */

  getAreasCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area?collection`);
  }

  getAllAreas(page?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${environment.baseAPIURL}/area`, { params });
  }

  getAreasByCity(city: number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area?city=${city}`);
  }

  getAreaById(id: string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area/${id}`);
  }

  deleteArea(id: string) {
    return this.http.delete(`${environment.baseAPIURL}/area/${id}`);
  }

  addArea(data: any) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.post(`${environment.baseAPIURL}/area`, data);
  }

  updateArea(data: { status: any; }, id: string) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.patch(`${environment.baseAPIURL}/area/${id}`, data);
  }


  getOrdersShip() {
    return this.http.get(`${environment.baseAPIURL}/Order/GetOrdersShip`);
  }

  getGetRegions(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/GeoData/GetRegions`);
  }

  getVendorById(id: string): Observable<any> {
    return this.http.get(
      `${environment.baseAPIURL}/Vendor/GetVendorInfo/${id}`
    );
  }

  deleteVendorById(id: string) {
    return this.http.delete(
      `${environment.baseAPIURL}/Vendor/DeleteVendorInfo/${id}`
    );
  }

  // Interceptor Auth
  getAuthToken() { }
  refreshAuthToken(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}`);
  }

  GetOrderStatistics(actionPeriod: number) {
    return this.http.get(
      `${environment.baseAPIURL}/order/actionPeriod/${actionPeriod}/GetOrderStatistics`
    );
  }

  GetOrdersByActionPeriodAndStatus(actionPeriod: number, status: any) {
    return this.http.get(
      `${environment.baseAPIURL}/Order/GetOrdersShipByActionStatus/${actionPeriod}/${status}`
    );
  }

  getDashboard() {
    return this.http.get(`${environment.baseAPIURL}/Dash/AdminState`);
  }
  GetSystemSummary() {
    return this.http.get(`${environment.baseAPIURL}/Financial/GetSystemSummary`);
  }

  /**
   * New Routes
   * Customers Routes
   */

  // Headers for the all requests

  GetAllCustomers(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/customer`);
  }

  GetCustomerById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/customer/${id}`);
  }

  DeleteCustomerById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/customer/${id}`);
  }

  AddNewCustomer(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/customer/`, body);
  }

  DownloadCustomersFile(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/download-excel-template`);
  }

  UploadCustomersFile(body: { headers?: HttpHeaders | Record<string, string | string[]>; context?: HttpContext; observe?: "body"; params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>; reportProgress?: boolean; responseType: "arraybuffer"; withCredentials?: boolean; transferCache?: { includeHeaders?: string[]; } | boolean; }): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/upload-customers`, body);
  }

  /**
   * Merchants Routes
   */

  /**
   * ware-house routes
   */

  AddNewWarehouse(body: any): Observable<any> {
    return this.http.post(`${environment.baseAPIURL}/admin/ware-house`, body);
  }

  /**
   * Price-list routes
   */

  GetPriceListsCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/price-list?collection`);
  }

  GetAllPriceList(page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())

    return this.http.get(`${environment.baseAPIURL}/admin/price-list`, { params });
  }

  GetPriceListById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/price-list/${id}`);
  }

  DeletePriceListById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/price-list/${id}`);
  }

  AddNewPriceList(body: { price_month: any; price_year: any; status: any; }): Observable<any> {
    body = {
      ...body,
      price_month: new Number(body.price_month),
      price_year: new Number(body.price_year),
      status: new Boolean(body.status)
    }
    return this.http.post<any>(`${environment.baseAPIURL}/admin/price-list`, body);
  }

  UpdatePriceList(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/admin/price-list/${id}`, body);
  }

  GetFeatures(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/price-list/features`);
  }

  ChangePriceListMerchent(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/change-price-list-merchent`, body);
  }

  /**
   * shipping-company Routes
  */

  GetShippingCompaniesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipping-company?collection`);
  }

  GetAllShippingCompanies(pageNumber?: number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipping-company?page=${pageNumber}`);
  }

  GetShippingCompanyById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipping-company/${id}`);
  }

  DeleteShippingCompanyById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/shipping-company/${id}`);
  }

  AddNewShippingCompany(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/shipping-company`, body);
  }

  UpdateShippingCompany(id: string | number, body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/shipping-company/${id}?_method=PATCH`, body);
  }

  /**
   * Shipment Routes
  */

  GetShipmentsCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipment?collection`);
  }

  GetAllShipments(page?: number, name?: string): Observable<any> {
    let params = new HttpParams();

    if (page) {
      params = params.set('page', page.toString());
    }

    if (name) {
      params = params.set('name', name);
    }

    return this.http.get(`${environment.baseAPIURL}/admin/shipment`, { params });
  }

  GetShipmentCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipment?collection`);
  }

  AddShipment(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/shipment`, body);
  }

  UpdateShipment(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/admin/shipment/${id}`, body);
  }

  GetShipmentById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipment/${id}`);
  }

  DeleteShipmentById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/shipment/${id}`);
  }

  /**
   * Create Zones to shipping-company Routes
  */

  AddZone(id: string | number, data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/shipping-company/${id}/zoom`, data);
  }

  GetAllZonesById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipping-company/${id}/zoom`);
  }

  GetZonesByIdCollection(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipping-company/${id}/zoom?collection`);
  }

  GetAllZonesByIdCollection(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipping-company/${id}/zoom?collection`);
  }

  GetZoneById(companyId: string | number, id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/shipping-company/${companyId}/zoom/${id}`);
  }

  DeleteZoneById(companyId: string | number, id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/shipping-company/${companyId}/zoom/${id}`);
  }

  UpdateZoneById(companyId: string | number, id: string | number, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/admin/shipping-company/${companyId}/zoom/${id}`, data);
  }

  /**
 * Create Price to Zones
*/

  AddZonePrice(zoneId: string | number, data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/zoom/${zoneId}/type`, data);
  }

  GetAllZonePricesById(zoneId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/zoom/${zoneId}/type`);
  }

  UpdateZonePriceById(zoneId: string | number, id: string | number, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/admin/zoom/${zoneId}/type/${id}`, data);
  }

  GetZonePriceById(zoneId: string | number, id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/zoom/${zoneId}/type/${id}`);
  }

  DeleteZonePriceById(zoneId: string | number, id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/zoom/${zoneId}/type/${id}`);
  }

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

  /**
   * Roles Routes
   * @Get All Roles
   * @Get Single Role @params id
   * @Post New Role @params data
   * @Update Role @params id, data
   * @Delete Role @params id
  */

  GetAllRoles(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/permission`);
  }

  GetSingleRole(id: number | string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/permission/${id}`);
  }

  AddRole(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/permission`, data);
  }

  UpdateRole(id: number | string, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/permission/${id}`, data);
  }

  DeleteRole(id: number | string): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/permission/${id}`);
  }

  /**
   * Stafe Routes
   * @Get All stafe
   * @Get Single stafe @params id
   * @Post New stafe
   * @Delete stafe @params id
  */

  // /admin/user params stafe = number

  GetAllStafe(page?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${environment.baseAPIURL}/admin/user?stafe=`, { params });
  }

  GetSingleStafe(id: number | string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/user/${id}?stafe=`);
  }

  AddStafe(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/user?stafe=`, data);
  }

  DeleteStafe(id: number | string): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/user/${id}`);
  }

}
