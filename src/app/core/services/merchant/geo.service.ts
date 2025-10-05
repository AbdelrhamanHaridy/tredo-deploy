import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class GeoService {
  constructor(private http: HttpClient) { }

  /**
   * Geo Services
   * @Get All Countries
   * @Get All Cities
   * @Get All Areas
  */

  getAllCountries(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country?collection`);
  }

  getCitiesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city?collection`);
  }

  getAllCities(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city`);
  }

  getAreasCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area?collection`);
  }

  getAllAreas(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area`);
  }

  getAllGovernorates(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/governorate`);
  }
}