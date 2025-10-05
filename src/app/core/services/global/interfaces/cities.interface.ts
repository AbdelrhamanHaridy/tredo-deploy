import { Errors, Pagination } from "./global.interface"

export interface CitiesResponse {
  data: CityData
  errors: Errors
  message: string
  success: boolean
}

export interface CityData {
  cities: City[]
  pagination: Pagination
}

export interface City {
  id: number
  name: string
  status: string
  status_label: string
}