import {
  InternalError,
  InternalErrorType,
} from 'contexts/shared/domain/InternalError';

export class UserEmail {
  private static emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  constructor(private email: string) {
    const emailIsValid = UserEmail.emailRegExp.test(email);

    if (!emailIsValid) {
      throw new InvalidEmailError();
    }
  }

  toDto(): string {
    return this.email;
  }
}

export class InvalidEmailError extends InternalError {
  constructor() {
    super(InternalErrorType.INVALID_EMAIL, 'Invalid email');
  }
}
