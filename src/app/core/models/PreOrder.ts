import { city } from "./City";
import { merchantsInfo } from "./MerchantsInfo";
import { EntityBase } from "./Shared/EntityBase";
import { shippingType } from "./shippingType";




    export class preOrder  implements EntityBase {
        public Id: number;
        public Notes?: string;
        public CreatedDate?: string | Date;
        public CreateBy?: number;
        public LastModifiedDate?: string | Date;
        public LastModifiedBy?: number;
        public IsActive?: boolean;
        public IsDeleted?: boolean;
        public CreatedBy?: string;
        public ModifiedBy?: string;


        public shippingTypeId: number = 0;
        public shippingType: shippingType ;
        public isProcessed: boolean = false;
        public weight: number = 0;
        public height: number = 0;
        public width: number = 0;
        public length: number = 0;
        public pickUpCity: string ;
        public pickUpAddress: string ;
        public pickUpLocation: string ;
        public pickUpEmail: string ;
        public pickUpMobileNu: string ;
        public dropOffName: string ;
        public dropOffCity: string ;
        public dropOffAddress: string ;
        public dropOffLocation: string ;
        public dropOffMobileNu: string ;
        public sendFromCityId: number = 0;
        public sendFromCity: city ;
        public sendToCityId: number = 0;
        public sendToCity: city ;
        public merchantsInfoId: number = 0;
        public merchantsInfo: merchantsInfo ;
        public description: string ;
        public itemsCount: number = 0;
        public orderRef: string ;
    }
