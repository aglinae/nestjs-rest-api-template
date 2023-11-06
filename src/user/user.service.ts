import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user.interface';
import { userData } from './data/usersData';

@Injectable()
export class UserService {
  private users: User[] = userData;
  getUser(id: number) {
    const user = this.users.find((user) => user.id);
    if (!user) {
      throw new NotFoundException(`User withd ID: ${id} is not found`);
    } else {
      return user;
    }
  }
  getUsers(): User[] {
    const findAll: User[] = this.users;
    return findAll;
  }
  createUser(user: User): User {
    const userId = Date.now();
    const newUser: User = {
      ...user,
      id: userId,
    };
    this.users.push(newUser);
    return newUser;
  }
  updateUser(id: number, updateUserDto: Partial<User>): User {
    const changeUser = this.users.find((user) => user.id === id);
    if (!changeUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } else {
      const changeUserIndex = this.users.indexOf(changeUser);
      this.users[changeUserIndex] = {
        ...this.users[changeUserIndex],
        ...updateUserDto,
      };
      return this.users[changeUserIndex];
    }
  }
  deleteUser(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} is not found`);
    }
    const userIndex = this.users.indexOf(user);
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }
}
