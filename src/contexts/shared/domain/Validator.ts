import { TranslatableText } from 'contexts/i18n';

export interface Validator<T> {
  validate(field: T): { isValid: boolean; message?: TranslatableText };
}

export class RegExpValidator implements Validator<string> {
  constructor(
    private readonly regExp: RegExp,
    private readonly errorMessage: TranslatableText
  ) {}

  validate(text: string): ReturnType<Validator<string>['validate']> {
    const isValid = this.regExp.test(text);

    return {
      isValid,
      message: isValid ? undefined : this.errorMessage,
    };
  }
}
