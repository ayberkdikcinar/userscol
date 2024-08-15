export const selectUserByIdQuery = (id: number) => {
  const query = `
  SELECT  id, name, surname, email, phone, age, country, district, role, "createdAt", "updatedAt" FROM users WHERE id=${id}`;

  return query;
};
