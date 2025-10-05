export interface Pagination {
  total: number
  per_page: number
  current_page: number
  last_page: number
  from: number
  to: number
  links: Links
}

export interface Links {
  first: string
  last: string
  prev: any
  next: string
}

export interface Errors {}

export interface PaginationParams {
  paginate?: boolean;
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  [key: string]: any;
}
