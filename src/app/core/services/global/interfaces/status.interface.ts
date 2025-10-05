import { Errors } from "./global.interface"

export interface StatusResponse {
  data: StatusData
  errors: Errors
  message: string
  success: boolean
}

export interface StatusData {
  status: Status[]
}

export interface Status {
  name: string
  value: string
  label: string
}