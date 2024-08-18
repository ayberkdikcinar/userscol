import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryOptions } from './dto/query-options';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 25;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() queryOptions: QueryOptions) {
    if (!queryOptions.page) {
      queryOptions.page = DEFAULT_PAGE;
    }

    if (!queryOptions.pageSize) {
      queryOptions.pageSize = DEFAULT_PAGE_SIZE;
    }
    return await this.usersService.getUsers(queryOptions);
  }

  @Get(':id')
  async getUser(@Param('id', new ParseIntPipe()) id: number) {
    return await this.usersService.getUser(id);
  }

  @Post('/save')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Post('/update')
  @HttpCode(200)
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(updateUserDto);
  }
}
