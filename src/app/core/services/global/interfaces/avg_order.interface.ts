import { Errors } from "./global.interface"

export interface AvgOrdersResponse {
  data: AvgOrdersData
  errors: Errors
  message: string
  success: boolean
}

export interface AvgOrdersData {
  avg_order: AvgOrder[]
}

export interface AvgOrder {
  name: string
  value: string
  label: string
}