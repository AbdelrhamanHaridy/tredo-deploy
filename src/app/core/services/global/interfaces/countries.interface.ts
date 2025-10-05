import { Errors, Pagination } from "./global.interface"

export interface CountriesResponse {
  data: CountriesData
  errors: Errors
  message: string
  success: boolean
}

export interface CountriesData {
  countries: Country[]
  pagination: Pagination
}

export interface Country {
  id: number
  name: string
  currency: string
  capital_id: string
  flag: string
  status: string
  status_label: string
}