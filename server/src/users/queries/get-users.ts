import { QueryOptions } from '../dto/query-options';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 25;

export const selectUsersQuery = (queryOptions: QueryOptions) => {
  let { page, pageSize, search } = queryOptions;

  if (!page) {
    page = DEFAULT_PAGE;
  }

  if (!pageSize) {
    pageSize = DEFAULT_PAGE_SIZE;
  }

  const offset = page * pageSize;

  const sanitizedSearch = search ? search.replace(/'/g, "''") : '';

  let query = `
WITH CTE AS (
    SELECT
        id, name, surname, email, phone, age, country, district, role, "createdAt", "updatedAt",
        COUNT(*) OVER() AS total_count
    FROM
        users
    WHERE (name ILIKE '${sanitizedSearch}%' OR surname ILIKE '${sanitizedSearch}%')
    ORDER BY
        name
    LIMIT ${pageSize}
    OFFSET ${offset}
)
SELECT
    *,
    total_count
FROM
    CTE;
`;

  return query;
};
