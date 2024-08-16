import { PaginationInfo } from './types/query-options';
import { User } from './types/user';
import { getEndpointURI } from './utils';
import axios from 'axios';
import type { QueryOptions } from './types/query-options';

const DEFAULT_QUERY_OPTIONS = {
  page: 0,
  pageSize: 25,
  search: '',
};
export interface FetchUsersResponse {
  data: User[];
  info: PaginationInfo;
}

async function fetchUsers(queryOptions: QueryOptions): Promise<FetchUsersResponse> {
  //queryOptions

  const response = (
    await axios.get(
      `${getEndpointURI('users')}?page=${queryOptions.page || DEFAULT_QUERY_OPTIONS.page}&pageSize=${
        queryOptions.pageSize || DEFAULT_QUERY_OPTIONS.pageSize
      }&search=${queryOptions.search || DEFAULT_QUERY_OPTIONS.search}`
    )
  ).data as FetchUsersResponse;

  return response;
}

async function fetchUser(id: number) {
  return id;
}

async function updateUser() {}

async function addUser() {}

export { fetchUser, fetchUsers, updateUser, addUser };
