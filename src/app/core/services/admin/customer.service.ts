import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient) { }

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

  UploadCustomersFile(body: any): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/upload-customers`, body);
  }
}
