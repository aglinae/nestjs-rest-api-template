import { Injectable } from '@nestjs/common';
import { NotFoundError } from './error/not-found.error';
import { User } from './interface/user.interface';
import { userData } from './data/usersData';
import { UserParamsDto } from './dto/user.dto';
Injectable();

export class UserService {
  private users: User[] = userData;
  getUser(userParamsDto: UserParamsDto) {
    const userIndex = this.users.findIndex(
      (user) => user.id === userParamsDto.id,
    );
    if (userIndex === -1) {
      throw new NotFoundError(
        `User withd ID: ${userParamsDto.id} is not found`,
      );
    } else {
      return this.users[userIndex];
    }
  }
  getUsers(): User[] {
    const findAll: User[] = this.users;
    return findAll;
  }
  createUser(user: User): User {
    this.users.push(user);
    return user;
  }
  updateUser(id: number, updateUserDto: Partial<User>): User {
    const changeUserIndex = this.users.findIndex((user) => user.id === id);
    if (changeUserIndex === -1) {
      throw new NotFoundError(`User with ID ${id} not found`);
    } else {
      this.users[changeUserIndex] = {
        ...this.users[changeUserIndex],
        ...updateUserDto,
      };
      return this.users[changeUserIndex];
    }
  }
  deleteUser(id: number): User {
    const findUserIndex = this.users.findIndex((user) => user.id === id);
    if (findUserIndex === -1) {
      throw new NotFoundError(`User with ID: ${id} is not found`);
    } else {
      const deletedUser = this.users.splice(findUserIndex, 1);
      return deletedUser[0];
    }
  }
}
