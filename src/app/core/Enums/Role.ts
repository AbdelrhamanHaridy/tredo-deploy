export enum Role {
  AddShippingCompany = 1,//أضافة  شركة شحن
  UpdateShippingCompany = 2,//تعديل شركة شحن
  DeleteShippingCompany = 3,//حذف شركة شحن
  ViewShippingCompany = 4,//الاطلاع على تفاصيل وبيانات  شركة الشحن
  ViewFinancialStatementsOfShippingCompany = 5,//الاطلاع على البيانات الماليه لشركات الشحن
  AddMerchant = 6,//أضافة تاجر
  UpdateMerchant = 7,//تعديل تاجر
  DeleteMerchant = 8,//حذف تاجر
  ViewFinancialStatementOfMerchant = 9,//الاطلاع على البيانات الماليه للتجار
  ShowMerchant = 10,//الاطلاع على تفاصيل وبيانات التاجر
  UpdateWalletBalance = 11,//تعديل رصيد محفظة
  StopWallet = 12,//ايقاف محفظة
  ModifySipmentInformation = 13,//تعديل بيانات شحنه
  CancellationShipmentRequest = 14,//الغاء طلب شحنه
  ViewAnalysisData = 15,//لاطلاع على بيانات التحليل
  ViewReports = 16,//الاطلاع على التقارير
  ViewGeneralFinancialStatement = 17,//الاطلاع على البيانات الماليه العامه
  SystemAdministrator = 18//مدير النظام
}
