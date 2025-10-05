import { Errors } from "./global.interface"

export interface OrderStatusResponse {
  data: OrderStatusData
  errors: Errors
  message: string
  success: boolean
}

export interface OrderStatusData {
  order_status: OrderStatus[]
}

export interface OrderStatus {
  name: string
  value: string
  label: string
}