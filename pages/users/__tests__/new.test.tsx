import React from 'react';
import { render, screen, fireEvent, waitFor } from 'test/utils';
import NewUser from '../new';

const useRouterMock = {
  replace: jest.fn(),
};

jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(useRouterMock);

describe('NewUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("doesn't submit the form until all fields are filled correctly", async () => {
    render(<NewUser locale="en-GB" />);

    await actions.submit();
    expect(useRouterMock.replace).not.toBeCalled();

    actions.setName('Alice Bob');
    await actions.submit();
    expect(useRouterMock.replace).not.toBeCalled();

    actions.setEmail('hello@world.com');
    await actions.submit();
    expect(useRouterMock.replace).not.toBeCalled();

    actions.setPassword('longsecret1');
    await actions.submit();
    expect(useRouterMock.replace).toBeCalledTimes(1);
    expect(useRouterMock.replace).toBeCalledWith('/');
  });

  describe('when the form has been filled', () => {
    beforeEach(() => {
      render(<NewUser locale="en-GB" />);
      actions.setName('Alice Bob');
      actions.setEmail('hello@world.com');
      actions.setPassword('longsecret1');
    });

    it("doesn't submit the form if the name is not valid", async () => {
      actions.setName('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

      await actions.submit();
      expect(useRouterMock.replace).not.toBeCalled();
      expect(screen.getByText('Use a shorter name')).toBeInTheDocument();
    });

    it("doesn't submit the form if the email is not valid", async () => {
      actions.setEmail('a');

      await actions.submit();
      expect(useRouterMock.replace).not.toBeCalled();
      expect(screen.getByText('Use a valid email address')).toBeInTheDocument();
    });

    it("doesn't submit the form if the password is not valid", async () => {
      actions.setPassword('   ');

      await actions.submit();
      expect(useRouterMock.replace).not.toBeCalled();
      expect(
        screen.getByText(
          'Use at least eight characters, one letter and one number'
        )
      ).toBeInTheDocument();
    });
  });
});

const actions = {
  submit: async () => {
    const submitButton = screen.getByRole('button');

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(submitButton).toBeEnabled());
  },
  setEmail: (email: string) =>
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: email },
    }),
  setName: (name: string) =>
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: name },
    }),
  setPassword: (password: string) =>
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: password },
    }),
};
