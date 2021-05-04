import { UserPassword, InvalidUserPassword } from '../UserPassword';

const fakeValidPassword = 'long.secret1';

describe('UserPassword', () => {
  describe('fromPlainText', () => {
    it('hashes the passed password', async () => {
      const password = await UserPassword.fromPlainText(fakeValidPassword);
      expect(password.toString()).not.toEqual(fakeValidPassword);
    });
    it("doesn't accept passwords with less than 8 characters, less than one letter and less than one number", async () => {
      await expect(UserPassword.fromPlainText('')).rejects.toEqual(
        new InvalidUserPassword('')
      );

      await expect(UserPassword.fromPlainText('           ')).rejects.toEqual(
        new InvalidUserPassword('           ')
      );

      await expect(UserPassword.fromPlainText('           2')).rejects.toEqual(
        new InvalidUserPassword('           2')
      );

      await expect(UserPassword.fromPlainText('longsecret')).rejects.toEqual(
        new InvalidUserPassword('longsecret')
      );

      await expect(UserPassword.fromPlainText('secret1')).rejects.toEqual(
        new InvalidUserPassword('secret1')
      );

      await expect(
        UserPassword.fromPlainText('longsecret1')
      ).resolves.toBeDefined();

      await expect(
        UserPassword.fromPlainText('long?secret13333.')
      ).resolves.toBeDefined();

      await expect(
        UserPassword.fromPlainText('54c$CWCjo*cRM$')
      ).resolves.toBeDefined();
    });
  });
  describe('fromHash', () => {
    it('hashes the passed password', () => {
      expect(UserPassword.fromHash(fakeValidPassword).toString()).toEqual(
        fakeValidPassword
      );
    });
  });
  describe('isEqual', () => {
    it('checks if the passed plain password is equal to the previously hashed password', async () => {
      const password = await UserPassword.fromPlainText(fakeValidPassword);

      await expect(password.isEqual(fakeValidPassword)).resolves.toBe(true);
      await expect(password.isEqual(fakeValidPassword + '1')).resolves.toBe(
        false
      );
    });
  });
});
