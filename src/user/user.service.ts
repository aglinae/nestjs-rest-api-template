import { Injectable } from '@nestjs/common';
import { NotFoundError } from './error/not-found.error';
import { User } from './interface/user.interface';
import { userData } from './data/usersData';
Injectable();

export class UserService {
  private users: User[] = userData;
  getUser(id: number) {
    const userBase = this.users.find((user) => user.id === id);
    return userBase;
  }
  getUsers(): User[] {
    const findAll: User[] = this.users;
    if (findAll) {
      return findAll;
    } else {
      throw new NotFoundError(`Not Found ${typeof findAll}`);
    }
  }
  createUser(user: User): User {
    if (
      !user.name ||
      typeof user.name !== 'string' ||
      !user.email ||
      typeof user.email !== 'string'
    ) {
      throw new NotFoundError('Please provide a valid name and email.');
    } else {
      this.users.push(user);
      return user;
    }
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