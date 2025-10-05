import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorService {
  constructor(private http: HttpClient) { }

  /* addVendor(data: any, id: string): Observable<any> {
    // ... (كود إضافة البائع)
  } */

  getAllVendors(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Vendor/GetVendorsInfo`);
  }

  GetVendorsInfoLite(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/Vendor/GetVendorsInfoLite`);
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
}
