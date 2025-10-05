
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ShippingService {
  constructor(private http: HttpClient) { }
  /**
   * Shipping Companies Routes
   * @Get All Shipping Companies @param collection
   * @Get Shipping Company By Id @param id
  */

  getShippingCompaniesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company?collection`);
  }

  getShippingCompanyById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${id}`);
  }

}
