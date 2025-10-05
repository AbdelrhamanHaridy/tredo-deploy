// shipment.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  constructor(private http: HttpClient) { }

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
}
