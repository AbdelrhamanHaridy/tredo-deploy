import { EntityBase } from "./Shared/EntityBase";
import { VendorInfo } from "./VendorInfo";




    export class VendortWarehouse  implements EntityBase {
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


        public NameTag: string = '';
        public VendorInfoId: number = 0;
        public Vendor: VendorInfo ;
        public PostalCode: number = 0;
        public ProvinceId: number = 0;
        public DistrictID: number = 0;
        public ShortcutAddress: string = '';
        public BuildingNumber: string = '';
        public Street: string = '';
        public AdditionalNumber: number = 0;
        public UnitNumber: string = '';
        public Unitfloor: string = '';
        public LocationPoint: string = '';
    }
