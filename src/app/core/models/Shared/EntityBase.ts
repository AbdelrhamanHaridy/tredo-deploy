export class EntityBase {
  constructor() {


  }
  Id: number;
  Notes?: string;
  CreatedDate?: Date | string;
  CreateBy?: number | null;
  LastModifiedDate?: Date | string | null;
  LastModifiedBy?: number | null;
  IsActive?: boolean;
  IsDeleted?: boolean;
  CreatedBy?: string;
  ModifiedBy?: string;
}


