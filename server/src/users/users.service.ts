import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserPayload } from './payload/user.payload';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Pool } from 'pg';
import { QueryOptions } from './dto/query-options';
import { selectUsersQuery } from './queries/get-users';
import { GetUsersPayload } from './payload/get-users.payload';
import * as bcrypt from 'bcrypt';
import { selectUserByIdQuery } from './queries/get-user';
import { ErrorMessage } from './types/enum/error-message';
import { paginationInfoWriter } from 'src/utils/pagination-info';
import { createUserQuery } from './queries/create-user';
import { updateUserQuery } from './queries/update-user';

@Injectable()
export class UsersService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  async getUsers(queryOptions: QueryOptions): Promise<GetUsersPayload> {
    const res = await this.pool.query(selectUsersQuery(queryOptions));
    const info = paginationInfoWriter(res.rows, queryOptions);

    const users = res.rows.map(
      ({ total_count, ...rest }) => rest,
    ) as UserPayload[];

    const response: GetUsersPayload = {
      data: users,
      info,
    };

    return response;
  }

  async getUser(id: number): Promise<UserPayload> {
    const res = await this.pool.query(selectUserByIdQuery(id));
    if (!res.rows.length) {
      throw new NotFoundException(`${ErrorMessage.UserNotFound}${id}`);
    }
    return res.rows[0] as UserPayload;
  }

  async createUser(user: CreateUserDto): Promise<UserPayload> {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      const values = [
        user.name,
        user.surname,
        user.email,
        user.password,
        user.phone,
        user.age,
        user.country,
        user.district,
        user.role,
      ];

      const res = await this.pool.query(createUserQuery, values);

      return res.rows[0] as UserPayload;
    } catch (error) {
      console.error('err:', error);
      if (error.code === '23505') {
        throw new HttpException(
          ErrorMessage.UserAlreadyExist,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          ErrorMessage.UserNotCreated,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UserPayload> {
    const fieldsToUpdate = ['"updatedAt" = CURRENT_TIMESTAMP'];
    const values = [];
    let index = 1;
    const userId = updateUserDto.id;

    await this.getUser(userId);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    for (const [key, value] of Object.entries(updateUserDto)) {
      if (key !== 'id') {
        fieldsToUpdate.push(`${key} = $${index}`);
        values.push(value);
        index++;
      }
    }

    if (fieldsToUpdate.length === 0) {
      throw new BadRequestException('No fields to update');
    }

    try {
      const res = await this.pool.query(
        updateUserQuery(fieldsToUpdate, userId),
        values,
      );

      return res.rows[0] as UserPayload;
    } catch (error) {
      console.error('err:', error);
      if (error.code === '23505') {
        throw new HttpException(
          ErrorMessage.UserAlreadyExist,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          ErrorMessage.UserNotUpdated,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
