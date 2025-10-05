import { merchantWarehouse } from './MerchantWarehouse';
import { merchantCategory } from "./MerchantCategory";
import { platformMerchantSubscription } from "./PlatformMerchantSubscription";
import { EntityBase } from "./Shared/EntityBase";
import { MechantAccountStatus } from "./Shared/ShipmentEnums";
import { wallets } from './Wallets';




    export class merchantsInfo   {
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


        public nameAr: string ;
        public nameComercial: string ;
        public nameEn: string ;
        public mobileNumber: string ;
        public phoneNumber: string ;
        public email: string ;
        public serviceCode: string ;
        public filesCount: number ;
        public pCode: string ;
        public officialName: string ;
        public commercialName: string ;
        public comFileNo: string ;
        public taxFileNo: string ;
        public bankName: string ;
        public iban: string ;
        public status: MechantAccountStatus;
        public merchantCategoryId: number ;
        public merchantCategory: merchantCategory ;
        public platformMerchantSubscriptions: platformMerchantSubscription[] = [];
        public merchantWarehouses: merchantWarehouse[] = [];
        public walletId: number ;
        public wallet: wallets ;
        public pictureRow: string ;
    }
