import { PaginationInfo } from 'src/users/payload/get-users.payload';
import { QueryOptions } from 'src/users/dto/query-options';

type ObjectWithTotal = {
  total_count?: string;
};

export function paginationInfoWriter(
  data: ObjectWithTotal[],
  queryOptions: QueryOptions,
): PaginationInfo {
  let total = 0;
  let nextPage = false;
  if (data.length > 0) {
    total = parseInt(data[0]?.total_count);
    let pointer =
      (queryOptions.page - 1) * queryOptions.pageSize + queryOptions.pageSize;

    nextPage = total - pointer > 0;
  }
  return {
    nextPage,
    total,
  };
}
