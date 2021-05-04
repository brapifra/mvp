import { TranslatableText } from 'contexts/i18n';

// TODO: Move this from shared folder
export function reactHookFormValidate(
  validationFn: (value: any) => any | Promise<any>
): (value: any) => TranslatableText | Promise<TranslatableText> {
  return async (value) => {
    try {
      await validationFn(value);
    } catch (e) {
      return e.hint || 'Invalid field';
    }
  };
}
