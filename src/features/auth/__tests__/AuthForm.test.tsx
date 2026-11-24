import { render, screen, userEvent, waitFor } from '@testing-library/react-native';

import { AuthForm } from '@/features/auth/AuthForm';
import { supabase } from '@/lib/supabase';

const mockReplace = jest.fn();

jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest mock factory
  const React = require('react') as typeof import('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- jest mock factory
  const { Text } = require('react-native') as typeof import('react-native');
  return {
    Link: ({ children }: { children: React.ReactNode }) => <Text>{children}</Text>,
    router: {
      replace: (...args: unknown[]) => mockReplace(...args),
    },
  };
});

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
    },
  },
}));

const signInWithPassword = supabase.auth.signInWithPassword as jest.Mock;
const signUp = supabase.auth.signUp as jest.Mock;

describe('AuthForm', () => {
  beforeEach(() => {
    mockReplace.mockReset();
    signInWithPassword.mockReset();
    signUp.mockReset();
  });

  it('shows field errors and skips supabase when the form is empty', async () => {
    const user = userEvent.setup();
    await render(<AuthForm mode="sign-in" />);

    await user.press(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Enter your email.')).toBeOnTheScreen();
    expect(screen.getByText('Enter a password.')).toBeOnTheScreen();
    expect(signInWithPassword).not.toHaveBeenCalled();
  });

  it('signs in with a trimmed email and navigates home', async () => {
    const user = userEvent.setup();
    signInWithPassword.mockResolvedValue({ data: { session: {} }, error: null });

    await render(<AuthForm mode="sign-in" />);
    await user.type(screen.getByTestId('email-input'), '  user@example.com  ');
    await user.type(screen.getByTestId('password-input'), 'password1');
    await user.press(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      expect(signInWithPassword).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password1',
      });
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  it('shows the supabase error message', async () => {
    const user = userEvent.setup();
    signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: { message: 'Invalid login credentials' },
    });

    await render(<AuthForm mode="sign-in" />);
    await user.type(screen.getByTestId('email-input'), 'user@example.com');
    await user.type(screen.getByTestId('password-input'), 'password1');
    await user.press(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByText('Invalid login credentials')).toBeOnTheScreen();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('asks the user to confirm email when sign-up returns no session', async () => {
    const user = userEvent.setup();
    signUp.mockResolvedValue({ data: { session: null }, error: null });

    await render(<AuthForm mode="sign-up" />);
    await user.type(screen.getByTestId('email-input'), 'user@example.com');
    await user.type(screen.getByTestId('password-input'), 'password1');
    await user.press(screen.getByRole('button', { name: 'Create account' }));

    expect(
      await screen.findByText('Check your email to confirm the account, then sign in.'),
    ).toBeOnTheScreen();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('shows a submitting state and disables the button while sign-in is in flight', async () => {
    const user = userEvent.setup();
    let resolveSignIn: (value: unknown) => void = () => {};
    signInWithPassword.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSignIn = resolve;
        }),
    );

    await render(<AuthForm mode="sign-in" />);
    await user.type(screen.getByTestId('email-input'), 'user@example.com');
    await user.type(screen.getByTestId('password-input'), 'password1');
    await user.press(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByTestId('auth-submitting')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeDisabled();

    resolveSignIn({ data: { session: {} }, error: null });
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  it('exposes supabase errors with an alert role', async () => {
    const user = userEvent.setup();
    signInWithPassword.mockResolvedValue({
      data: { session: null },
      error: { message: 'Invalid login credentials' },
    });

    await render(<AuthForm mode="sign-in" />);
    await user.type(screen.getByTestId('email-input'), 'user@example.com');
    await user.type(screen.getByTestId('password-input'), 'password1');
    await user.press(screen.getByRole('button', { name: 'Sign in' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials');
  });
});
