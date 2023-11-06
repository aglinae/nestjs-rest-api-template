import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOneUser(id: number): Promise<User> {
    return await this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async removeUser(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
