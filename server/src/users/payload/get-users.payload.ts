import { UserPayload } from './user.payload';

export class GetUsersPayload {
  data: UserPayload[];
  info: PaginationInfo;
}

export interface PaginationInfo {
  nextPage: boolean;
  total: number;
}
