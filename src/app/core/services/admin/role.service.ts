import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private http: HttpClient) { }

  /**
   * Roles Routes
   * @Get All Roles
   * @Get Single Role @params id
   * @Post New Role @params data
   * @Update Role @params id, data
   * @Delete Role @params id
  */

  GetAllRoles(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/permission`);
  }

  GetSingleRole(id: number | string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/permission/${id}`);
  }

  AddRole(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/permission`, data);
  }

  UpdateRole(id: number | string, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.baseAPIURL}/permission/${id}`, data);
  }

  DeleteRole(id: number | string): Observable<any> {
    return this.http.delete(`${environment.baseAPIURL}/permission/${id}`);
  }
}
