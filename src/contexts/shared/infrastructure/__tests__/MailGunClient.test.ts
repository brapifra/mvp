import { MailGunClient } from '../MailGunClient';

const mailGunClientMock = {
  messages: {
    create: jest.fn(),
  },
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mailGunClientFn = jest.fn((config: any) => mailGunClientMock);

jest.mock('mailgun.js', () => ({
  __esModule: true,
  default: class {
    client = (config: any) => mailGunClientFn(config);
  },
}));

const fakeApiKey = 'fake-api-key';
const fakeDomain = 'fake-domain.com';
const client = new MailGunClient({ apiKey: fakeApiKey, domain: fakeDomain });

describe('MailGunClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('passes the correct configuration to the mailgun client library', () => {
    new MailGunClient({ apiKey: fakeApiKey, domain: fakeDomain });

    expect(mailGunClientFn).toBeCalledTimes(1);
    expect(mailGunClientFn).toBeCalledWith({
      key: fakeApiKey,
      username: 'api',
      url: 'https://api.eu.mailgun.net',
    });
  });
  describe('send', () => {
    it('sends email correctly', async () => {
      const email = {
        from: 'alice',
        to: 'bob',
        subject: 'hiya',
        text: ':)',
      };
      await client.send(email);
      expect(mailGunClientMock.messages.create).toBeCalledTimes(1);
      expect(mailGunClientMock.messages.create).toBeCalledWith(
        fakeDomain,
        email
      );
    });
  });
});
