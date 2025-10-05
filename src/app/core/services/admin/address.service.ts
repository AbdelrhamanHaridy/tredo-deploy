// address.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddressService {
  constructor(private http: HttpClient) { }

  // Countries
  getCountriesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country?collection`);
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country`);
  }

  getCountryById(id: string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/country/${id}`);
  }

  deleteCountry(id: string) {
    return this.http.delete(`${environment.baseAPIURL}/country/${id}`);
  }

  addCountry(data: any, id: string) {
    data.id = id;
    return this.http.post(`${environment.baseAPIURL}/country`, data);
  }

  updateCountry(data: any, id: string) {
    return this.http.patch(`${environment.baseAPIURL}/country/${id}`, data);
  }

  // Cities
  getCitiesCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city?collection`);
  }

  getAllCities(page?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${environment.baseAPIURL}/city`, { params });
  }

  getCitiesByCountry(country: number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city?country=${country}`);
  }

  getCityById(id: string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/city/${id}`);
  }

  deleteCity(id: string) {
    return this.http.delete(`${environment.baseAPIURL}/city/${id}`);
  }

  addCity(data: any) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.post(`${environment.baseAPIURL}/city`, data);
  }

  updateCity(data: any, id: string) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.patch(`${environment.baseAPIURL}/city/${id}`, data);
  }

  // Areas
  getAreasCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area?collection`);
  }

  getAllAreas(page?: number, name?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page.toString());
    }
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get(`${environment.baseAPIURL}/area`, { params });
  }

  getAreasByCity(city: number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area?city=${city}`);
  }

  getAreaById(id: string): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/area/${id}`);
  }

  deleteArea(id: string) {
    return this.http.delete(`${environment.baseAPIURL}/area/${id}`);
  }

  addArea(data: any) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.post(`${environment.baseAPIURL}/area`, data);
  }

  updateArea(data: any, id: string) {
    data = {
      ...data,
      status: new Boolean(data.status)
    }
    return this.http.patch(`${environment.baseAPIURL}/area/${id}`, data);
  }
}
