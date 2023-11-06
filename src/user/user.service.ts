import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { CreateUserDto, UserUpdateDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUser(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    return user;
  }
  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: createUserDto });
  }
  async updateUser(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: userUpdateDto,
    });
  }
  async deleteUser(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
