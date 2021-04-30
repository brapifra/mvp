import { InvalidEmailError, UserEmail } from '../UserEmail';

describe('UserEmail', () => {
  describe('toDto', () => {
    it('returns the email', () => {
      const email = 'valid@email.com';
      expect(new UserEmail(email).toDto()).toEqual(email);
    });
  });
  it('throws an error when the email is not valid', () => {
    expect(() => new UserEmail('invalid')).toThrowError(
      new InvalidEmailError()
    );
  });
});
