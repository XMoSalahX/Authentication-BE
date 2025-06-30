import { SetMetadata } from '@nestjs/common';
import { UserRolesEnums } from '../enums/userRoles.enums';

export const Roles = (...roles: UserRolesEnums[]) =>
  SetMetadata('roles', roles);
