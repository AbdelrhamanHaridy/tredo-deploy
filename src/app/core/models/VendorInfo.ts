import { EntityBase } from "./Shared/EntityBase";
import { ShippingCompanyStatus } from "./Shared/ShipmentEnums";
import { VendorContract } from "./VendorContract";
import { VendortWarehouse } from "./VendortWarehouse";
import { VendorZone } from "./VendorZone";




export class VendorInfo implements EntityBase {
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
  public MobileNumber: number = 0;
  public PhoneNumber: number = 0;
  public Email: string = '';
  public PCode: string = '';
  public OfficialName: string = '';
  public CommercialName: string = '';
  public ComFileNo: string = '';
  public TaxFileNo: string = '';
  public BankName: string = '';
  public IBAN: string = '';
  public ServiceCode: string = '';
  public FilesCount: number = 0;
  public status: ShippingCompanyStatus = ShippingCompanyStatus.Pending;
  public VendortWarehouses: VendortWarehouse[] = [];
  public WalletsId: number = 0;
  //     public Wallet: Wallets = null;
  public Contracts: VendorContract[] = [];
  public VendorZones: VendorZone[] = [];
  public PictureRow: string = '';
}
