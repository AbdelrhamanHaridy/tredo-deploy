import { Errors, Pagination } from "./global.interface"

export interface IndustriesResponse {
  data: IndustryData
  errors: Errors
  message: string
  success: boolean
}

export interface IndustryData {
  industry: Industry[]
  pagination: Pagination
}

export interface Industry {
  id: number
  name: string
}