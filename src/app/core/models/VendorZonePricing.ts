import { EntityBase } from "./Shared/EntityBase";
import { VendorZone } from "./VendorZone";




    export class VendorZonePricing  implements EntityBase {
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


        public VendorZoneId: number = 0;
        public VendorZone: VendorZone ;
        public ShippingTypeId: number = 0;
     //   public ShippingType: ShippingType;
        public Price: number = 0;
        public VatValue: number = 0;
        public CommissionValue: number = 0;
        public Total: number = 0;
    }
