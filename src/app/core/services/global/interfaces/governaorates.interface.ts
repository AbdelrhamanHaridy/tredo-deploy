import { Errors, Pagination } from "./global.interface"

export interface GovernorateatesResponse {
  data: GovernorateData
  errors: Errors
  message: string
  success: boolean
}

export interface GovernorateData {
  governorates: Governorate[]
  pagination: Pagination
}

export interface Governorate {
  id: number
  name: string
  status: string
  status_label: string
}


