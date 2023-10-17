import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUser(@Param('id') id: string): User {
    return this.userService.getUser(+id);
  }
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
  @Post()
  createUser(@Body() user: User): User {
    return this.userService.createUser(user);
  }
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ): User {
    return this.userService.updateUser(+id, updateUserDto);
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string): User {
    return this.userService.deleteUser(+id);
  }
}
