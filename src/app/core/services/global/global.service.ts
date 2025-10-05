import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { GovernorateatesResponse } from './interfaces/governaorates.interface';
import { CitiesResponse } from './interfaces/cities.interface';
import { AreasResponse } from './interfaces/areas.interface';
import { IndustriesResponse } from './interfaces/industries.interface';
import { CountriesResponse } from './interfaces/countries.interface';
import { AccountTypesResponse } from './interfaces/account-types.interface';
import { OrderStatusResponse } from './interfaces/order-status.intreface';
import { AvgOrdersResponse } from './interfaces/avg_order.interface';
import { StatusResponse } from './interfaces/status.interface';
import { ServiceTypesResponse } from './interfaces/service-type.interface';
import { PaginationParams } from './interfaces/global.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
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

  /** 🔥 ميثود عامة */
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

  /** 🌍 Geo Services */
  getGovernorates(
    params?: PaginationParams
  ): Observable<GovernorateatesResponse> {
    return this.getAll<GovernorateatesResponse>('governorate', params);
  }

  getAllCities(params?: PaginationParams): Observable<CitiesResponse> {
    return this.getAll<CitiesResponse>('cities', params);
  }

  getAllCountries(params?: PaginationParams): Observable<CountriesResponse> {
    return this.getAll<CountriesResponse>('countries', params);
  }

  getAllAreas(params?: PaginationParams): Observable<AreasResponse> {
    return this.getAll<AreasResponse>('areas', params);
  }

  getAllIndustries(params?: PaginationParams): Observable<IndustriesResponse> {
    return this.getAll<IndustriesResponse>('industries', params);
  }

  getAllAccountTypes(): Observable<AccountTypesResponse> {
    return this.getAll<AccountTypesResponse>('account-types');
  }

  getAllAvgOrders(): Observable<AvgOrdersResponse> {
    return this.getAll<AvgOrdersResponse>('avg-order');
  }

  getAllOrderStatus(): Observable<OrderStatusResponse> {
    return this.getAll<OrderStatusResponse>('order-status');
  }

  getAllStatus(): Observable<StatusResponse> {
    return this.getAll<StatusResponse>('status');
  }

  getAllServiceTypes(): Observable<ServiceTypesResponse> {
    return this.getAll<ServiceTypesResponse>('service-type');
  }
}
