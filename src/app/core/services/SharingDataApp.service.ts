import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { merchantsInfo } from '../models/MerchantsInfo';

@Injectable({
  providedIn: 'root'
})
export class SharingDataAppService {

constructor() { }


private MerchantData= new BehaviorSubject<merchantsInfo>(new merchantsInfo());
MerchantMeta$: Observable<merchantsInfo> = this.MerchantData.asObservable();
SetUserMetaData(Model: merchantsInfo) {
  this.MerchantData.next(Model);
  localStorage.setItem('merchantInfo', JSON.stringify(Model));

}

}
