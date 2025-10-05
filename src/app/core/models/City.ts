import { region } from "./Region";
import { EntityBase } from "./Shared/EntityBase";

export class city  implements EntityBase {
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
  public geofanceCode: string ;
  public regionId: number ;
  public region: region ;
}
