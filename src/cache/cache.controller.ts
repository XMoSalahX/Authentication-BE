import { Controller } from '@nestjs/common';
import { CacheService } from './cache.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Cache')
@ApiSecurity('app')
@ApiSecurity('version')
@ApiSecurity('os')
@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}
}
