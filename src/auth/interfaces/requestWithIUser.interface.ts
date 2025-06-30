import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

interface IRequestWithUser extends Request {
  user: User;
}

export default IRequestWithUser;
