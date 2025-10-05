import { Errors } from "./global.interface"

export interface AccountTypesResponse {
  data: AccountTypesData
  errors: Errors
  message: string
  success: boolean
}

export interface AccountTypesData {
  account_types: AccountType[]
}

export interface AccountType {
  name: string
  value: string
  label: string
}