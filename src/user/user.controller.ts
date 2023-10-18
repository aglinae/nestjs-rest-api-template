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
import { UserDto, UserParamsDto } from './dto/user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): User {
    const userParamsDto = new UserParamsDto();
    userParamsDto.id = id;
    const user = this.userService.getUser(userParamsDto);
    return user;
  }
  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: UserDto): User {
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
  deleteUser(@Param('id') params: UserParamsDto): User {
    return this.userService.deleteUser(+params.id);
  }
}
