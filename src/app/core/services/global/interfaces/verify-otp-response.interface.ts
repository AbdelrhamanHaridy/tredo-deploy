export interface VerifyOtpResponse {
  data: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
      email_verified_at: string | null;
      phone: string;
      business_name: string;
      industry_id: number;
      average_order: string;
      status: string;
      otp_code: string | null;
      price_list_id: number | null;
      country_id: number;
      governorate_id: number | null;
      city_id: number | null;
      type: string;
      terms_accepted: number;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
    };
    token: string;
  };
  errors: any;
  message: string;
  success: boolean;
}
