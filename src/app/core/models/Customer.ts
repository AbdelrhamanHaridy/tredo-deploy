export interface CustomerDto {
  name: string
  phone: string
  address: string
  user_id: number
  city_id: number
}
export interface CustomerResponse {
  data: CustomerData
  errors: Errors
  message: string
  success: boolean
}

export interface CustomerData {
  id: number
  name: string
  phone: string
  address: string
  city: string
  marchent: string
  created_at: string
}

export interface MerchantResponse {
  data: MerchantData
  errors: Errors
  message: string
  success: boolean
}

export interface MerchantData {
  id: number
  username: string
  name_ar: string
  name_en: string
  email: string
  phone: string
  image: string
  service_code: string
  business_name: string
  web_link: string
  business_industry: string
  commercial_register_number: string
  tax_register_number: string
  Official_name: string
  avg_order: string
  status: string
  bank_name: string
  iban: string
  account_name: string
  account_number: string
  wallet_number: string
  wallet_owner_name: string
}

interface WareHouse {
  id: number
  country: string
  city: string
  area: string
  logo: string
  name: string
  admin: string
  phone: string
  phone2?: string
  address: string
  location: string
  status: string
}

interface Errors { }
