import { Area } from '../../../../../core/services/global/interfaces/areas.interface';
import { City } from '../../../../../core/services/global/interfaces/cities.interface';
import { Country } from '../../../../../core/services/global/interfaces/countries.interface';
import { Links } from '../../../../../core/services/global/interfaces/global.interface';
import { Governorate } from '../../../../../core/services/global/interfaces/governaorates.interface';

export interface CustomersResponse {
  data: CustomerData;
  errors: Errors;
  message: string;
  success: boolean;
}

export interface CustomerData {
  customers: Customer[];
  pagination: Pagination;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  phone2: string;
  email: string;
  address: string;
  country: Country;
  governorate: Governorate;
  city: City;
  area: Area;
  status: string;
  status_label: string;
  quality: Quality;
  reverse_orders: ReverseOrders;
  created_date_at: string;
}

export interface Quality {
  count: number;
  percentage: number;
}

export interface ReverseOrders {
  type: string;
  percentage: number;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: Links;
}

export interface CustomerSearchParams {
  status?: string;
  country_id?: string;
  city_id?: string;
  governorate_id?: string;
  is_primary?: string;
  search?: string;
  orders?: string | number;
  created_date_at?: string;
  name?: string;
  phone?: string;
  email?: string;
  from_date?: string;
  to_date?: string;
  area_id?: string;
}

export interface Errors {}

/** */
export interface StatsDataResponse {
  data: StatsData;
  errors: Errors;
  message: string;
  success: boolean;
}

export interface StatsData {
  stats: Stats;
}

export interface Stats {
  total_customers: number;
  new_this_month: number;
  top_governorate: TopGovernorate;
  top_city: TopCity;
}

export interface TopGovernorate {
  name: string;
  total_customers: number;
  concentration_increase: number;
}

export interface TopCity {
  name: string;
  total_customers: number;
  concentration_increase: number;
}

export interface Errors {}
