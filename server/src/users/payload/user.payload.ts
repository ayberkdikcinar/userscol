import type { Role } from '../types/enum/role.';
import type { IBasePayload } from 'src/types/base/base-payload';

export class UserPayload implements IBasePayload {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  district: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
