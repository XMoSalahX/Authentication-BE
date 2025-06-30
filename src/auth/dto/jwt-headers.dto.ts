import { IsJWT } from 'class-validator';

export class JwtHeaders {
  @IsJWT()
  csrfToken: string;
}
