import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient) { }
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
}
