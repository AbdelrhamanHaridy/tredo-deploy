import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StaffService {
  constructor(private http: HttpClient) { }

  /**
     * Stafe Routes
     * @Get All stafe
     * @Get Single stafe @params id
     * @Post New stafe
     * @Delete stafe @params id
    */

  // /admin/user params stafe = number

  GetAllStafe(page?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${environment.baseAPIURL}/admin/user?stafe=`, { params });
  }

  GetSingleStafe(id: number | string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/admin/user/${id}?stafe=`);
  }

  AddStafe(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/admin/user?stafe=`, data);
  }

  DeleteStafe(id: number | string): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/admin/user/${id}`);
  }
}
