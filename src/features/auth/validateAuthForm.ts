export type AuthMode = 'sign-in' | 'sign-up';

export type AuthFieldErrors = {
  email?: string;
  password?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuthForm(email: string, password: string, mode: AuthMode): AuthFieldErrors {
  const errors: AuthFieldErrors = {};
  const trimmed = email.trim();

  if (!trimmed) {
    errors.email = 'Enter your email.';
  } else if (!EMAIL.test(trimmed)) {
    errors.email = 'Enter a valid email.';
  }

  if (!password) {
    errors.password = 'Enter a password.';
  } else if (mode === 'sign-up' && password.length < 8) {
    errors.password = 'Use at least 8 characters.';
  }

  return errors;
}
