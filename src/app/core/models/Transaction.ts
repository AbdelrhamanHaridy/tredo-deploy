


    
    export class transaction  implements EntityBase {
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

        
        public amount: number = 0;
        public description: string = null;
        public token: string = null;
        public transactionStatus: TransactionStatus = TransactionStatus.Inprogress;
        public applicationUser_Created: ApplicationUser = null;
        public applicationUser_LastModified: ApplicationUser = null;
        public userCreated: string = null;
        public userModified: string = null;
        public orderId: number = null;
        public merchantId: number = 0;
        public transactionSuccessId: string = null;
    }