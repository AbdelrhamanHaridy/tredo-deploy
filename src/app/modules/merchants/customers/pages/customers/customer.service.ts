import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationParams } from '../../../../../core/services/global/interfaces/global.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { StatsDataResponse } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerRefresh = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  private buildParams(params?: PaginationParams): string {
    if (!params) return '';

    let httpParams = new HttpParams();
    let manualParams: string[] = [];

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (key === 'paginate' && value === true) {
        manualParams.push('paginate');
      } else if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value);
      }
    });

    const query = httpParams.toString();
    return [...manualParams, query].filter(Boolean).join('&');
  }

  refreshCustomers() {
    this.customerRefresh.next(undefined);
  }
  get customerRefresh$(): Observable<void> {
    return this.customerRefresh.asObservable();
  }

  private getAll<T>(
    resource: string,
    params?: PaginationParams
  ): Observable<T> {
    const query = this.buildParams(params);
    const url = `${environment.baseAPIURL}/${resource}${
      query ? '?' + query : ''
    }`;
    return this.http.get<T>(url);
  }

  /* getCustomers(
      params?: PaginationParams | WarehouseSearchParams
    ): Observable<WarehousesResponse> {
      return this.getAll<WarehousesResponse>('warehouse', params);
    } */

  getCustomers(params?: PaginationParams): Observable<any> {
    return this.getAll<any>('customer', params);
  }

  /* setPrimaryCustomer(id: string): Observable<any> {
      return this.http.patch(
        `${environment.baseAPIURL}/customers/${id}/set-primary`,
        null
      );
    }
    getWarehouseById(id: string): Observable<SingleWarehouseResponse> {
      return this.http.get<SingleWarehouseResponse>(
        `${environment.baseAPIURL}/warehouse/${id}`
      );
    }
  
    updateWarehouse(
      id: string,
      body: WarehouseDto
    ): Observable<SingleWarehouseResponse> {
      const updateBody = {
        ...body,
        _method: 'PUT',
      };
  
      return this.http.post<SingleWarehouseResponse>(
        `${environment.baseAPIURL}/warehouse/${id}`,
        updateBody
      );
    } */

  /* addWarehouse(body: WarehouseDto): Observable<SingleWarehouseResponse> {
      return this.http.post<SingleWarehouseResponse>(
        `${environment.baseAPIURL}/warehouse`,
        body
      );
    } */

  /* deleteWarehouse(id: string): Observable<any> {
      return this.http.delete(`${environment.baseAPIURL}/warehouse/${id}`);
    } */
  setPrimaryCustomer(id: string): Observable<any> {
    return this.http.patch(
      `${environment.baseAPIURL}/customer/${id}/set-primary`,
      null
    );
  }
  getCustomerById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseAPIURL}/customer/${id}`);
  }

  updateCustomer(id: string, body: any): Observable<any> {
    const updateBody = {
      ...body,
      _method: 'PUT',
    };

    return this.http.post<any>(
      `${environment.baseAPIURL}/customer/${id}`,
      updateBody
    );
  }

  addCustomer(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/customer`, body);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/customer/${id}`);
  }

  getCustomerStats(): Observable<StatsDataResponse> {
    return this.http.get<StatsDataResponse>(
      `${environment.baseAPIURL}/customer/stats`
    );
  }
}
