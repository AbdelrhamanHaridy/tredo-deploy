import { Errors, Pagination } from './global.interface';

export interface AreasResponse {
  data: AreasData;
  errors: Errors;
  message: string;
  success: boolean;
}

export interface AreasData {
  areas: Area[];
  pagination: Pagination;
}

export interface Area {
  id: number;
  name: string;
  status: string;
  status_label: string;
}
