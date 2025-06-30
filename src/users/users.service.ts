import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from '../auth/enums/userStatus.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(filter: Record<string, any>) {
    return await this.usersRepository.findOne(filter);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);
  }

  async updateStatus(id: string, status: UserStatus) {
    return await this.usersRepository.updateOneVoid(
      { id },
      {
        userStatus: status,
      },
    );
  }
}
