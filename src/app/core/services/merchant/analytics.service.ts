import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

// analytics.service.ts
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/analytics`);
  }
}
