export interface QueryOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface PaginationInfo {
  nextPage: boolean;
  total: number;
}
