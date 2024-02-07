import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendDemoEmail(metadata: { userEmail: string; code: string; userName: string }) {
    await this.mailerService.sendMail({
      to: metadata.userEmail,
      subject: 'Hello',
      template: './demo', // `.ejs` extension is appended automatically
      context: {
        userName: metadata.userName,
        code: metadata.code,
      },
    });

    Logger.log('Email sent successfully');
  }
}
