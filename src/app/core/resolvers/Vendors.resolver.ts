import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin/admin.service';

@Injectable({
    providedIn: 'root'
})
export class VendorsResolver implements Resolve<Observable<any>> {
    constructor(private adminService: AdminService) { }
    resolve(): Observable<any> {
        return this.adminService.getAllVendors()
    }
}