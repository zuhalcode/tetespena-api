/* eslint-disable prettier/prettier */
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Body, Controller, Post } from '@nestjs/common';

import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WebResponse } from 'src/model/web.model';
import { UserResponseDto } from './dto/user-response';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created user object as response',
    example: {
      email: 'zuhal@gmail.com',
      firstName: 'zuhal',
      lastName: 'code',
      name: 'zuhal code',
    },
  })
  @ApiConflictResponse({
    description: 'User created failed because user already exist',
    example: {
      message: 'User already exist',
    },
  })
  create(
    @Body() createUserRequest: CreateUserDto,
  ): Promise<WebResponse<UserResponseDto>> {
    return this.userService.create(createUserRequest);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<WebResponse<UserResponseDto>> {
  //   return this.userService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
