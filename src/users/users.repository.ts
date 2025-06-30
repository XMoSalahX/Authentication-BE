import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from 'src/utils/base.abstract.repository';
import { User, UsersDocument } from './entities/user.entity';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UsersDocument>,
  ) {
    super(userModel);
  }
}
