import { Area } from '../../../../../core/services/global/interfaces/areas.interface';

export interface WarehousesResponse {
  data: WarehouseData;
  errors: Errors;
  message: string;
  success: boolean;
}

export interface WarehouseDto {
  name: string;
  responsible_manger_name: string;
  phone: string;
  phone2?: string;
  email: string;
  address: string;
  country_id: string;
  governorate_id: string;
  location: string;
  city_id: string;
  area_id?: string;
  status: string;
  is_primary: boolean;
  created_date_at: string;
}

export interface WarehouseSearchParams {
  status?: string;
  country_id?: string;
  city_id?: string;
  governorate_id?: string;
  is_primary?: string;
  search?: string;
  created_date_at?: string;
  name?: string;
  phone?: string;
  email?: string;
  from_date?: string;
  to_date?: string;
  area_id?: string;
}

export interface SingleWarehouseResponse {
  data: Data;
  errors: Errors;
  message: string;
  success: boolean;
}

export interface Data {
  warehouse: Warehouse;
}

export interface WarehouseData {
  warehouses: Warehouse[];
  pagination: Pagination;
}

export interface Warehouse {
  id: number;
  name: string;
  responsible_manger_name: string;
  phone: string;
  phone2: string;
  email: string;
  address: string;
  location: string;
  status: string;
  status_label: string;
  is_primary: boolean;
  country: Country;
  governorate: Governorate;
  city: City;
  area: Area;
  created_date_at: string;
}

export interface Country {
  id: number;
  name: string;
  currency: string;
  capital_id: string;
  flag: string;
  status: string;
  status_label: string;
}

export interface Governorate {
  id: number;
  name: string;
  status: string;
  status_label: string;
}

export interface City {
  id: number;
  name: string;
  status: string;
  status_label: string;
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

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: any;
}

export interface Errors {}

/* */
export interface StatsDataResponse {
  data: Data;
  errors: Errors;
  message: string;
  success: boolean;
}

export interface Data {
  stats: Stats;
}

export interface Stats {
  total_warehouses: number;
  total_active_warehouses: number;
  total_governorates: number;
  total_areas: number;
  total_cities: number;
}

export interface Errors {}
