// TODO: Replace "crypto" module with browser-compatible lib
import { createHash } from 'crypto';
import { RegExpValidator } from 'contexts/shared/domain/Validator';

export class UserPassword {
  private constructor(private passwordHash: string) {}

  static fromPlainText(plainPassword: string): UserPassword {
    return new UserPassword(
      createHash('sha256').update(plainPassword).digest('hex')
    );
  }

  static fromHash(hashedPassword: string): UserPassword {
    return new UserPassword(hashedPassword);
  }

  toString(): string {
    return this.passwordHash;
  }
}

export const UserPasswordValidator = new RegExpValidator(
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
  'Use at least eight characters, one letter and one number'
);

export const UserEmailValidator = new RegExpValidator(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  'Use a valid email address'
);
