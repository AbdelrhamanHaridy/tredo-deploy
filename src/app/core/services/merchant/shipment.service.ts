import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ShipmentService {
  constructor(private http: HttpClient) { }
  /**
     * Shipments
     * @Get All Shipments @param collection
     * @Get Shipment By Id @param id
    */

  getShipmentsCollection(): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipment?collection`);
  }

  getShipmentById(id: string | number): Observable<any> {
    return this.http.get(`${environment.baseAPIURL}/user/shipment/${id}`);
  }
}
