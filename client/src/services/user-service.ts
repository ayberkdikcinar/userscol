import { PaginationInfo } from './types/query-options';
import { User } from './types/user';
import { getEndpointURI } from './utils';
import axios from 'axios';
import type { QueryOptions } from './types/query-options';

const DEFAULT_QUERY_OPTIONS = {
  page: 0,
  pageSize: 10,
  search: '',
};

export interface ErrorResponse {
  message: string | string[];
}
export interface FetchUsersResponse {
  data: User[];
  info: PaginationInfo;
}

async function fetchUsers(queryOptions: QueryOptions): Promise<FetchUsersResponse> {
  const response = (
    await axios.get(
      `${getEndpointURI('users')}?page=${queryOptions.page || DEFAULT_QUERY_OPTIONS.page}&pageSize=${
        queryOptions.pageSize || DEFAULT_QUERY_OPTIONS.pageSize
      }&search=${queryOptions.search || DEFAULT_QUERY_OPTIONS.search}`
    )
  ).data as FetchUsersResponse;

  return response;
}

async function fetchUser(id: number): Promise<User> {
  const response = (await axios.get(`${getEndpointURI('users')}/${id}`)).data as User;

  return response;
}

async function updateUser(user: User) {
  const response = (
    await axios.post(`${getEndpointURI('users')}/update`, {
      ...user,
    })
  ).data as User;
  return response;
}

async function addUser(user: User): Promise<User> {
  const response = (
    await axios.post(`${getEndpointURI('users')}/save`, {
      ...user,
    })
  ).data as User;
  return response;
}

export { fetchUser, fetchUsers, updateUser, addUser };
