import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { MerchantService } from '../services/admin/merchant.service';

@Injectable({
    providedIn: 'root'
})
export class MerchantResolver implements Resolve<Observable<any>> {
    constructor(private merchantService: MerchantService) { }
    resolve(): Observable<any> {
        return this.merchantService.getAllMerchant()
    }
}