import { EntityBase } from "./Shared/EntityBase";
import { WalletTransactionSource, WalletTransactionType } from "./Shared/ShipmentEnums";
import { wallets } from "./Wallets";




    export class walletTransaction  implements EntityBase {
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


        public oldBalance: number = 0;
        public newBalance: number = 0;
        public amount: number = 0;
        public transactionType: WalletTransactionType;
        public transactionSource: WalletTransactionSource;
        public walletsId: number ;
        public wallet: wallets ;
        public operationRefrance: string ;
        public operationDescription: string ;
        public operationDate: Date = new Date(0);
    }
