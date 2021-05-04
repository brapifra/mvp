import React from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  useTranslate,
  withI18StaticProps,
  I18nStaticProps,
} from 'contexts/i18n';
import { UserName } from 'contexts/user/domain/UserName';
import { reactHookFormValidate } from 'contexts/shared/infrastructure/reactHookFormValidate';
import { UserEmail } from 'contexts/user/domain/UserEmail';
import { UserPassword } from 'contexts/user/domain/UserPassword';

type Props = I18nStaticProps;

const NewUser: React.FC<Props> = ({ locale }) => {
  const router = useRouter();
  const t = useTranslate(locale);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    errors,
  } = useForm();

  const onSubmit = handleSubmit(({ name, email, password }) => {
    router.replace('/');
    // eslint-disable-next-line no-console
    console.log(email, password, name);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          placeholder={t('Name')}
          ref={register({
            required: t('Required'),
            validate: reactHookFormValidate((name) => new UserName(name)),
          })}
        />
        <div>{t(errors.name?.message)}</div>
        <input
          name="email"
          placeholder={t('Email')}
          ref={register({
            required: t('Required'),
            validate: reactHookFormValidate((email) => new UserEmail(email)),
          })}
        />
        <div>{t(errors.email?.message)}</div>
        <input
          name="password"
          placeholder={t('Password')}
          type="password"
          ref={register({
            required: t('Required'),
            validate: reactHookFormValidate((password) =>
              UserPassword.fromPlainText(password)
            ),
          })}
        />
        <div>{t(errors.password?.message)}</div>
        <button disabled={isSubmitting} type="submit">
          {t('Create account')}
        </button>
      </form>
    </>
  );
};

export default NewUser;

export const getStaticProps: GetStaticProps = withI18StaticProps();
