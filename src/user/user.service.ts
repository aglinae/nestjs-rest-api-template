import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOneUser(id: number): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID: ${id} is not found`);
    }
    return userToUpdate;
  }

  async removeUser(id: number): Promise<User> {
    const userToDelete = await this.prisma.user.delete({
      where: { id },
    });
    if (!userToDelete) {
      throw new NotFoundException(`User with ID: ${id} is not found`);
    }
    return userToDelete;
  }
}
