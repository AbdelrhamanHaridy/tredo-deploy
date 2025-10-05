import { EntityBase } from "./Shared/EntityBase";
import { VendorInfo } from "./VendorInfo";




    export class VendorContract  implements EntityBase {
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
        public ContractStartDate: Date ;
        public ContractEndDate: Date ;
        public CODActive: boolean = false;
        public CODCommission: number = 0;
        public CODExtraCommission: number = 0;
        public CODTransDuDays: number = 0;
        public TriesCount: number = 0;
        public ExtraKMDistanceCost: number = 0;
        public ExtraKMWeightCost: number = 0;
        public MaxCompensationValue: number = 0;
        public PickUpFees: number = 0;
        public ReturnFees: number = 0;
        public FailureShipFees: number = 0;
        public FailureShipReturnDuInDays: number = 0;
        public IsLinked: boolean = false;
        public IsAvTracking: boolean = false;
        public IsPresented: boolean = false;
        public RecivingInLocalWareHouseOnly: boolean = false;
        public DeliveryInLocalWareHouseOnly: boolean = false;
    }
