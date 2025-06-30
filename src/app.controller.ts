import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SKIP_JWT } from './utils/decorators/skip-jwt.decorator';
import { BaseResponse } from './utils/baseResponse';
import { UserRolesEnums } from './auth/enums/userRoles.enums';
import { Roles } from './auth/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Server')
@ApiSecurity('app')
@ApiSecurity('version')
@ApiSecurity('os')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @SKIP_JWT()
  @Get()
  serverChecking() {
    return BaseResponse.success(this.appService.serverChecking());
  }

  @Roles(UserRolesEnums.SUPER_ADMIN)
  @Get('gc')
  gc() {
    if (global.gc) global.gc();

    return BaseResponse.success('Garbage collector invoked');
  }
}
