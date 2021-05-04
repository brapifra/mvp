import argon2 from 'argon2-browser';
import { RegExpValidator } from 'contexts/shared/domain/Validator';

export class UserPassword {
  private static regExp = /^(?=.*[A-Za-z.,#?!@$%^&*-])(?=.*\d)[A-Za-z.,#?!@$%^&*-\d]{8,}$/i;
  private constructor(private hashedPassword: string) {}

  static async fromPlainText(plainPassword: string): Promise<UserPassword> {
    if (!UserPassword.regExp.test(plainPassword)) {
      return Promise.reject(new InvalidUserPassword(plainPassword));
    }

    const password = await argon2.hash({
      pass: plainPassword,
      salt: getRandomBytes(16),
      type: argon2.ArgonType.Argon2id,
    });

    return UserPassword.fromHash(password.encoded);
  }

  static fromHash(hashedPassword: string): UserPassword {
    return new UserPassword(hashedPassword);
  }

  async isEqual(plainPassword: string): Promise<boolean> {
    try {
      await argon2.verify({
        pass: plainPassword,
        encoded: this.hashedPassword,
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  toString(): string {
    return this.hashedPassword;
  }
}

export class InvalidUserPassword extends Error {
  constructor(plainPassword: string) {
    super(`'${plainPassword}' is not a valid user password`);
  }
}

// https://gist.github.com/alexdiliberto/39a4ad0453310d0a69ce
const getRandomBytes = (typeof process === 'undefined'
  ? function () {
      // Browsers
      const QUOTA = 65536;
      return (n) => {
        const a = new Uint8Array(n);

        for (let i = 0; i < n; i += QUOTA) {
          crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
        }
        return a;
      };
    }
  : function () {
      // Node
      return require('crypto').randomBytes;
    })();

// TODO: Remove validators
export const UserPasswordValidator = new RegExpValidator(
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
  'Use at least eight characters, one letter and one number'
);

export const UserEmailValidator = new RegExpValidator(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  'Use a valid email address'
);
