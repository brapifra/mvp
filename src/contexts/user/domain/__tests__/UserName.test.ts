import { EmptyUserNameError, LongUserNameError, UserName } from '../UserName';

describe('UserName', () => {
  describe('toDto', () => {
    it('returns the user name', () => {
      const name = new Array(30).fill('a').join('');
      expect(new UserName(name).toDto()).toEqual(name);
    });
  });
  it('throws an error when the name contains more than 30 characters', () => {
    const invalidName = new Array(31).fill('a').join('');
    expect(() => new UserName(invalidName)).toThrowError(
      new LongUserNameError(invalidName)
    );
  });
  it('throws an error when the name is empty', () => {
    expect(() => new UserName('')).toThrowError(new EmptyUserNameError());
    expect(() => new UserName(new Array(30).fill(' ').join(''))).toThrowError(
      new EmptyUserNameError()
    );
  });
});
