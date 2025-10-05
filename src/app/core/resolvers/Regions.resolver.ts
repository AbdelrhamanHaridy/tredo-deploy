import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin/admin.service';
import { ShippingService } from '../services/admin/shipping.service';

@Injectable({
    providedIn: 'root'
})
export class RegionsResolver implements Resolve<Observable<any>> {
    constructor(private adminService: AdminService) { }
    resolve(): Observable<any> {
        return this.adminService.getGetRegions()
    }
}