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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() queryOptions: QueryOptions) {
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
