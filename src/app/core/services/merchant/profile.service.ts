import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) { }
  /**
     * Profile Settings
     * @Get Profile Settings @param page
     * @Post Update Profile Settings @param body
     * @Delete Delete Profile Settings @param id
     * @Post Update Password @param body
    */

  getProfile(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/profile`);
  }

  updateMerchant(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/profile/1?_method=PATCH`, body);
  }

  GetInit() {
    return this.http.get<any>(`${environment.baseAPIURL}/get_init`);
  }

  updatePassword(body: any): Observable<any> {
    return this.http.post<any>(`${environment.baseAPIURL}/profile`, body);
  }
}
