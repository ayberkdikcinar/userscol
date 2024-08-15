export const createUserQuery = `
INSERT INTO users (
  name, surname, email, password, phone, age, country, district, role, "createdAt", "updatedAt"
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
)
RETURNING id, name, surname, email, phone, age, country, district, role, "createdAt", "updatedAt"
`;
