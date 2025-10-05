import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PriceListService {
  constructor(private http: HttpClient) { }

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

  AddNewPriceList(body: any): Observable<any> {
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
}
