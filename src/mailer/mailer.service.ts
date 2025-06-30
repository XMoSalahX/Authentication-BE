import { Inject, Injectable, Logger } from '@nestjs/common';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor(
    @Inject('MAIL_TRANSPORTER')
    private readonly transporter: Transporter,
  ) {}
  async sendMail(to: string, subject: string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"ClickUp" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html,
      });
      this.logger.log(`Email sent: ${info.messageId}`);
      return info;
    } catch (err) {
      this.logger.error(`Failed to send email: ${err.message}`);
      throw err;
    }
  }
}
