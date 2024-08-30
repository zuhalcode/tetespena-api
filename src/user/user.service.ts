import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponseDto } from './dto/user-response';
import { WebResponse } from '../model/web.model';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(req: CreateUserDto): Promise<WebResponse<UserResponseDto>> {
    const { id, email, name, firstName, lastName } = req;

    console.log({ id, email, name, firstName, lastName });

    try {
      const userExist = await this.prisma.user.findUnique({ where: { id } });
      if (userExist) throw new ConflictException('User already exist');

      // Create a new user
      const newUser = await this.prisma.user.create({
        data: {
          id,
          email,
          name,
          firstName,
          lastName,
        },
        select: { email: true, name: true, firstName: true, lastName: true },
      });

      return { data: newUser, message: 'User saved successfully' };
    } catch (e) {
      console.log(e);

      // Only rethrow the original exception if it's a known one
      if (e instanceof ConflictException) throw e;

      // Throw a general internal server error for other cases
      throw new ConflictException('An unexpected error occurred');
    }
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number): Promise<WebResponse<UserResponseDto>> {
  //   return `This action returns a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
