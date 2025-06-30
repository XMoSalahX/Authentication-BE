import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Module({
  imports: [ConfigModule],
  controllers: [MailerController],
  providers: [
    {
      provide: 'MAIL_TRANSPORTER',
      useFactory: (configService: ConfigService) => {
        return nodemailer.createTransport({
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        });
      },
      inject: [ConfigService],
    },
    MailerService,
  ],
  exports: [MailerService],
})
export class MailerModule {}
