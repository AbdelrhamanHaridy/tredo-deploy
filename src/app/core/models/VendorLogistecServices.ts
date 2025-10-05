import { LogistecServices } from "./LogistecServices";
import { EntityBase } from "./Shared/EntityBase";
import { VendorInfo } from "./VendorInfo";




    export class VendorLogistecServices  implements EntityBase {
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


        public VendorInfoId: number = 0;
        public Vendor: VendorInfo ;
        public LogistecServicesId: number = 0;
        public LogistecService: LogistecServices ;
    }
