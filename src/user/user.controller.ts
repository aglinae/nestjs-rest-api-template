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
import { User } from './interface/user.interface';
import { CreateUserDto, UserUpdateDto } from './dto/user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.getUser(id);
  }
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto): User {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ): User {
    return this.userService.updateUser(id, userUpdateDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.deleteUser(id);
  }
}
