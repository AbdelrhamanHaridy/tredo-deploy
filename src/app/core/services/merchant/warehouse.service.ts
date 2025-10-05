import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  constructor(private http: HttpClient) { }
  /**
   * WareHouses
   * @Get All WareHouses @param page
   * @Get WareHouse By Id @param id
   * @Post Add New WareHouse @param body
   * @Patch Update WareHouse @param id, body
   * @Delete Delete WareHouse @param id
  */
  // user/ware-house

  /* getAllWareHouses(page: string | number = 1, filters?: any): Observable<any> {
    const pageParam = Math.max(1, Number(page)) || 1;
    let params = new HttpParams().set('page', pageParam.toString());

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, String(value));
        }
      });
    }

    return this.http.get(`${environment.baseAPIURL}/user/ware-house`, { params });
  } */

  getAllWareHouses(page: string | number = 1, filters?: any): Observable<any> {
    const validPage = Number(page);
    const pageParam = (!isNaN(validPage) && validPage > 0 ? validPage : 1);

    // Initialize HttpParams with the page parameter
    let params = new HttpParams().set('page', pageParam.toString());

    // Add filter parameters if they exist
    if (filters) {
      if (filters.name) {
        params = params.set('name', filters.name);
      }
      if (filters.admin) {
        params = params.set('admin', filters.admin);
      }
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

    return this.http.get(`${environment.baseAPIURL}/user/ware-house`, { params });
  }

  getWareHouseCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/ware-house?collection`);
  }

  getWareHouseById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/ware-house/${id}`);
  }

  addNewWareHouse(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/user/ware-house`, body);
  }

  updateWareHouse(id: string | number, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/user/ware-house/${id}`, body);
  }

  deleteWareHouseById(id: string | number): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/user/ware-house/${id}`);
  }
}
