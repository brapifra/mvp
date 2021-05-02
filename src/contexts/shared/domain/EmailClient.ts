export interface EmailClient {
  send(email: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }): Promise<void>;
}
