import { QueryOptions } from '../dto/query-options';

export const selectUsersQuery = (queryOptions: QueryOptions) => {
  let { page, pageSize, search } = queryOptions;

  const offset = page * pageSize;

  const sanitizedSearch = search ? search.replace(/'/g, "''") : '';

  let query = `
WITH CTE AS (
    SELECT
        id, name, surname, email, phone, age, country, district, role, "createdAt", "updatedAt",
        COUNT(*) OVER() AS total_count
    FROM
        users
    WHERE (fullname ILIKE '${sanitizedSearch}%')
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
