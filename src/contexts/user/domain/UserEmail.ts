import { ErrorWithHint } from 'contexts/shared/domain/ErrorWithHint';

export class UserEmail {
  private static emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  constructor(private email: string) {
    const emailIsValid = UserEmail.emailRegExp.test(email);

    if (!emailIsValid) {
      throw new InvalidEmailError(email);
    }
  }

  toDto(): string {
    return this.email;
  }
}

export class InvalidEmailError extends ErrorWithHint {
  constructor(email: string) {
    super(
      `'${email}' is not a valid email address`,
      'Use a valid email address'
    );
  }
}
