import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT_TOKEN = 'SKIP_JWT_TOKEN';

export const SKIP_JWT = () => SetMetadata(SKIP_JWT_TOKEN, true);
