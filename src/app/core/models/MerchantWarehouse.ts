import { merchantsInfo } from "./MerchantsInfo";
import { EntityBase } from "./Shared/EntityBase";




    export class merchantWarehouse  implements EntityBase {
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


        public nameTag: string;
        public merchantsInfoId: number = 0;
        public merchantsInfo: merchantsInfo;
        public postalCode: number;
        public provinceId: number;
        public districtID: number;
        public shortcutAddress: string;
        public buildingNumber: string;
        public street: string;
        public additionalNumber: string;
        public unitNumber: string;
        public unitfloor: string;
        public locationPoint: string;
        public isWorking: boolean = false;
    }
