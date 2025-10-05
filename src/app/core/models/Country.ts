import { EntityBase } from "./Shared/EntityBase";




    export class Country  implements EntityBase {
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


        public NameAr: string = '';
        public NameEn: string = '';
        public TimeZoneOffset: string = '';
        public PhoneCode: string = '';
        public GeofanceCode: string = '';
       // public Regions: Region[] = [];
    }
