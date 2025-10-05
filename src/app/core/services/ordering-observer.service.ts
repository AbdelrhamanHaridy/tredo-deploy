import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderingState } from '../models/Shared/ordering-state';

@Injectable({
  providedIn: 'root',
})
export class OrderingObserverService {
  constructor() {

    let storedProp = localStorage.getItem('storedProp');
    if (storedProp)
      {
        this.SetOrderingState(JSON.parse(storedProp) as OrderingState);
      }

        this.OrderingData.asObservable().subscribe(odr=>{
          localStorage.setItem('storedProp', JSON.stringify(odr));
        });
  }

  private OrderingData = new BehaviorSubject<OrderingState>(
    new OrderingState()
  );
  OrderingStateMeta$: Observable<OrderingState> =this.OrderingData.asObservable();


  SetOrderingState(Model: OrderingState) {
    this.OrderingData.next(Model);
  }
  SetOrderingStateIsManual(isManual: boolean) {
    this.OrderingData.value.IsManual = isManual;
    this.UpdateOrderingState();
  }
  SetOrderingStateIsProcessing(isProcessing: boolean) {
    this.OrderingData.value.IsProcessing = isProcessing;
    this.UpdateOrderingState();
  }
  SetOrderingStateIsProcessed(isProcessed: boolean) {
    this.OrderingData.value.IsProcessed = isProcessed;
    this.UpdateOrderingState();
  }
  SetOrderingStateOfferResponseRoot(offerResponseRoot: any) {
    this.OrderingData.value.OfferResponseRoot = offerResponseRoot;
    this.UpdateOrderingState();
  }
  SetOrderingStateOfferRequestDTO(offerRequestDTO: any[]) {
    this.OrderingData.value.OfferRequestDTO = offerRequestDTO;
    this.UpdateOrderingState();
  }
  SetOrderingStateOfferResponseHeader(offerResponseHeader: any) {
    // Selected  company
    this.OrderingData.value.OfferResponseHeader = offerResponseHeader;
    this.UpdateOrderingState();
  }
  SetOrderingStateIsLockedOnOffer(isLockedOnOffer: boolean) {
    this.OrderingData.value.IsLockedOnOffer = isLockedOnOffer;
    this.UpdateOrderingState();
  }
  ClearOrderingState() {
    this.OrderingData.next(new OrderingState());
    localStorage.setItem('storedProp', '');
  }
  private UpdateOrderingState(){
      localStorage.setItem('storedProp', JSON.stringify(this.OrderingData.value));
  }
}
