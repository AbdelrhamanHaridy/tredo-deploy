import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShippingService {
  constructor(private http: HttpClient) { }

  // Shipping Companies
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
}
