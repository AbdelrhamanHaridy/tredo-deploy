import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ZoneService {
  constructor(private http: HttpClient) { }

  /**
   * Zones Routes
   * @Get Collection of Zones @param shippingCompanyId @param collection
   * @Get All Zones @param shippingCompanyId @param page
   * @Get Zone By Id @param shippingCompanyId @param id
  */

  getZonesCollection(shippingCompanyId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${shippingCompanyId}/zoom?collection`);
  }

  getAllZones(shippingCompanyId: string | number, page: string | number = 1): Observable<any> {
    const validPage = Number(page);
    const pageParam = !isNaN(validPage) && validPage > 0 ? validPage : 1;

    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${shippingCompanyId}/zoom?page=${pageParam}`);
  }

  getZoneById(shippingCompanyId: string | number, id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipping-company/${shippingCompanyId}/zoom/${id}`);
  }

  /**
   * Type in Zones
   * @Get Collection of Types in Zone @param zoneId @param collection
   * @Get Types in Zone @param zoneId
   * @Get Type in Zone By Id @param zoneId @param id
  */

  getTypeInZoneCollection(zoneId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/zoom/${zoneId}/type?collection`);
  }

  getTypeInZone(zoneId: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/zoom/${zoneId}/type`);
  }

  getTypeInZoneById(zoneId: string | number, id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/zoom/${zoneId}/type/${id}`);
  }
}
