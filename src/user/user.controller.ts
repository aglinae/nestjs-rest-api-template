import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto, UserUpdateDto } from './dto/user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.getUser(id);
  }
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, userUpdateDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
