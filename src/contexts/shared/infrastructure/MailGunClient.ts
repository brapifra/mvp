import AbortController from 'node-abort-controller';
global.AbortController = AbortController;

import { EmailClient } from 'contexts/shared/domain/EmailClient';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData as any);

type Client = ReturnType<typeof mailgun.client>;

interface MailGunClientConfig {
  apiKey: string;
  domain: string;
}

export class MailGunClient implements EmailClient {
  private client: Client;

  constructor(private config: MailGunClientConfig) {
    this.client = mailgun.client({
      username: 'api',
      url: 'https://api.eu.mailgun.net',
      key: config.apiKey,
    });
  }

  send(email: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }): Promise<void> {
    return this.client.messages.create(this.config.domain, email);
  }
}
