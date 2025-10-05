/*
export class RegisterModel {
    public Username?: string = '';
    public Email?: string = '';
    public Password?: string = '';
    public UserType: number = 0;
    public ConfirmPassword?: string = '';

}
*/

export interface RegisterModel {
  username: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  country_code: string
  business_name: string
  web_link: string
  business_industry: string
  avg_order: string
}

export interface ResetPasswordModel {
  password: string;
  password_confirmation: string;
  token: string;
}


