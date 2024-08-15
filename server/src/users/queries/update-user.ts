export const updateUserQuery = (fieldsToUpdate: string[], id: number) => {
  const query = `
  UPDATE users
  SET ${fieldsToUpdate.join(', ')}
  WHERE id = ${id}
  RETURNING id, name, surname, email, phone, age, country, district, role, "createdAt", "updatedAt"
`;

  return query;
};
