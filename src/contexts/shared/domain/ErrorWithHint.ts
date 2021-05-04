import { TranslatableText } from 'contexts/i18n';

export class ErrorWithHint extends Error {
  constructor(message: string, public hint: TranslatableText) {
    super(message);
  }
}
