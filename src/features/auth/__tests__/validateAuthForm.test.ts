import { validateAuthForm } from '@/features/auth/validateAuthForm';

describe('validateAuthForm', () => {
  it('requires an email and password', () => {
    expect(validateAuthForm('', '', 'sign-in')).toEqual({
      email: 'Enter your email.',
      password: 'Enter a password.',
    });
  });

  it('rejects an invalid email', () => {
    expect(validateAuthForm('not-an-email', 'password1', 'sign-in')).toEqual({
      email: 'Enter a valid email.',
    });
  });

  it('trims the email before validating', () => {
    expect(validateAuthForm('  user@example.com  ', 'password1', 'sign-in')).toEqual({});
  });

  it('allows any non-empty password on sign-in', () => {
    expect(validateAuthForm('user@example.com', 'short', 'sign-in')).toEqual({});
  });

  it('requires at least 8 characters on sign-up', () => {
    expect(validateAuthForm('user@example.com', 'short', 'sign-up')).toEqual({
      password: 'Use at least 8 characters.',
    });
  });

  it('accepts a valid sign-up form', () => {
    expect(validateAuthForm('user@example.com', 'password1', 'sign-up')).toEqual({});
  });
});
