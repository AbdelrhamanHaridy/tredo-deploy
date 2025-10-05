import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  SingleWarehouseResponse,
  StatsDataResponse,
  WarehouseDto,
  WarehouseSearchParams,
  WarehousesResponse,
} from './warehouse.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { PaginationParams } from '../../../../../core/services/global/interfaces/global.interface';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  private warehouseRefresh = new BehaviorSubject<void>(undefined);

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

  refreshWarehouses() {
    this.warehouseRefresh.next(undefined);
  }

  get warehouseRefresh$(): Observable<void> {
    return this.warehouseRefresh.asObservable();
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
  getWarehouses(
    parms?: PaginationParams | WarehouseSearchParams
  ): Observable<WarehousesResponse> {
    return this.getAll<WarehousesResponse>('warehouse', parms);
  }

  setPrimaryWarehouse(id: string): Observable<any> {
    return this.http.patch(
      `${environment.baseAPIURL}/warehouse/${id}/set-primary`,
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
  }

  addWarehouse(body: WarehouseDto): Observable<SingleWarehouseResponse> {
    return this.http.post<SingleWarehouseResponse>(
      `${environment.baseAPIURL}/warehouse`,
      body
    );
  }

  deleteWarehouse(id: string): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/warehouse/${id}`);
  }

  getWarehouseStats(): Observable<StatsDataResponse> {
    return this.http.get<StatsDataResponse>(
      `${environment.baseAPIURL}/warehouse/stats`
    );
  }
}
