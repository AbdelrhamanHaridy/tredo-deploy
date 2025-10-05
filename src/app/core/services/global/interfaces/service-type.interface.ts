export interface ServiceTypesResponse {
  data: ServiceTypesData
  errors: Errors
  message: string
  success: boolean
}

export interface ServiceTypesData {
  service_type: ServiceType[]
}

export interface ServiceType {
  name: string
  value: string
  label: string
}

export interface Errors {}
