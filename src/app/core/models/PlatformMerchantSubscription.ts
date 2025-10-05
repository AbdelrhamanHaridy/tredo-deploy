import { platformsInfo } from './PlatformsInfo';
import { merchantsInfo } from "./MerchantsInfo";
import { EntityBase } from "./Shared/EntityBase";




    export class platformMerchantSubscription  implements EntityBase {
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


        public merchantsInfoId: number = 0;
        public merchantsInfo: merchantsInfo ;
        public platformsInfoId: number = 0;
        public platformsInfo: platformsInfo ;
        public subscriptionDate: Date = new Date(0);
        public isAllowed: boolean = false;
        public merchantId: string ;
        public merchantCode: string ;
        public merchantToken: string ;
        public tokenExpirationDate: Date = new Date(0);
    }
