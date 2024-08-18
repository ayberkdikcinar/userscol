import type { Role } from './role';

export interface User {
  id?: number;
  password?: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
  age: number;
  country?: string;
  district?: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
}
