export enum OrderStatus {
  Pending = 1,
  Submitted = 2,
  Approved = 3,
  OutforDelivery = 4,
  Delivered = 5,
  // if current status = Pending or Submitted
  Canceled = 6,
  Stumbled = 7,
}

export enum ShippingCompanyStatus {
  Pending = 0,
  Approved = 1,
  TotalPaused = 2,
  PartialPasused = 3,
  Suspended = 100,
}
export enum MechantAccountStatus {
  Pending = 0,
  Approved = 1,
  TotalPaused = 2,
  PartialPasused = 3,
  Suspended = 100,
}

export enum GeoCoverage {
  RegionsBased = 1,
  CitiesBased = 2,
  WholeCountry = 100
}

export enum OrderActionUpdateSource {
  AdminUser = 1,
  AgentUser = 2,
  AgentApi = 3,
  MerchentUser = 4,
  MerchentApi = 5,
  PlatformUser = 6,
  PlatformApi = 7,

}
export enum FinancialDuesType {
  Shipfee = 1,
  PickUpfee = 2,
  ExtraWeightfee = 3,
  ExtraKMDistanceCost = 4,
  CompensationValue = 5,
  ReturnFee = 6,
  FailureShipFees = 7,
  Pay = 8
}
export enum DealingSide {
  Merchant = 1,
  Madiator = 2,
  Vendor = 3
}
export enum WalletStatus {
  Active = 1,
  Inactive = 2,
  Deleted = 3,
  Suspended = 4
}
export enum WalletType {
  ShippingCompany = 1,
  Merchant = 2
}
export enum WalletTransactionStatus {
  Active = 1,
  Inactive = 2,
  Deleted = 3
}
export enum WalletTransactionType {
  Deposit = 1,
  Withdraw = 2,
}
export enum WalletTransactionSource {
  PaymentGetway = 1,
  ManualEntry = 2,
  InternalSettlement = 3
}
