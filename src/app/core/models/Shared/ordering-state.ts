export class OrderingState {
  /**
   *
   */
  constructor() {
    this.IsManual = false;
    this.IsProcessing = false;
    this.IsProcessed = false;
    this.IsLockedOnOffer = false;
    this.OfferRequestDTO = [];
    this.OfferResponseRoot ={};
    this.OfferResponseHeader ={};
  }
  IsManual : boolean;
  IsProcessing : boolean;
  IsProcessed : boolean;
  OfferResponseRoot:any;
  OfferRequestDTO:any[];
  OfferResponseHeader:any; // Selected  company
  RowManualOrder:any;
  RowExeclOrder:any;
  IsLockedOnOffer:boolean;
}
