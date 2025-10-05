import { EntityBase } from "./Shared/EntityBase";
import { GeoCoverage } from "./Shared/ShipmentEnums";
import { VendorInfo } from "./VendorInfo";
import { VendorZoneGeo } from "./VendorZoneGeo";
import { VendorZonePricing } from "./VendorZonePricing";




    export class VendorZone  implements EntityBase {
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
        public NameAr: string = '';
        public NameEn: string = '';
        public GeoCoverageLevel: GeoCoverage = GeoCoverage.RegionsBased;
        public VendorZoneGeos: VendorZoneGeo[] = [];
        public VendorZonePricings: VendorZonePricing[] = [];
        public RegionId: number = 0;
    //    public Region: Region = null;
        public StartRecivingTime: string = '';
        public EndRecivingTime: string = '';
        public Is24Hours: boolean = false;
    }
