import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { ShippingService } from '../services/admin/shipping.service';

@Injectable({
    providedIn: 'root'
})
export class ShippingResolver implements Resolve<Observable<any>> {
    constructor(private shippingService: ShippingService) { }
    resolve(): Observable<any> {
        return this.shippingService.getAllShipping()
    }
}