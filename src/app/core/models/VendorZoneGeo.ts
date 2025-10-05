import { city } from './City';

import { EntityBase } from "./Shared/EntityBase";
import { VendorZone } from "./VendorZone";




    export class VendorZoneGeo  implements EntityBase {
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
        public CityId: number = 0;
        public City: city ;
    }
