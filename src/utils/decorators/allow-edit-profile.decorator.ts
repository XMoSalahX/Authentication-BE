import { SetMetadata } from '@nestjs/common';

export const ALLOW_With_UNDER_REVIEW = 'ALLOW_With_UNDER_REVIEW';

export const ALLOW_UR = () => SetMetadata(ALLOW_With_UNDER_REVIEW, true);
