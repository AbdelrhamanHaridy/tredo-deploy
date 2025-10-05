import { merchantsInfo } from "./MerchantsInfo";
import { EntityBase } from "./Shared/EntityBase";




    export class merchantCategory  implements EntityBase {
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
        public nameEn: string ;
        public maxOrderPerDay: number = 0;
        public allowCredit: boolean = false;
        public maxUsers: number = 0;
        public merchantsInfoList: merchantsInfo[] = [];
    }
