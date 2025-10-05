import { walletTransaction } from './WalletTransaction';
import { EntityBase } from "./Shared/EntityBase";
import { WalletStatus } from './Shared/ShipmentEnums';




    export class wallets  implements EntityBase {
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


        public balance: number = 0;
        public status: WalletStatus
        public merchantsInfoId: number ;
        public vendorInfoId: number ;
        public refCode: string ;
        public allowCredit: boolean ;
        public lastOperationDate: Date ;
        public walletTransactions: walletTransaction[] = [];
    }
