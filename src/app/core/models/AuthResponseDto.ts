export interface AuthResponseDto {
  data: AuthResponseData
  errors: AuthResponseErrors
  message: string
  success: boolean
}
interface AuthResponseData {
  token: string
}

interface AuthResponseErrors { }
