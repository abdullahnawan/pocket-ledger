import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { validateAuthForm, type AuthMode } from '@/features/auth/validateAuthForm';
import { supabase } from '@/lib/supabase';

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState(validateAuthForm('', '', mode));
  const [showErrors, setShowErrors] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignIn = mode === 'sign-in';

  async function onSubmit() {
    const errors = validateAuthForm(email, password, mode);
    setFieldErrors(errors);
    setShowErrors(true);
    setFormError(null);
    setInfo(null);
    if (errors.email || errors.password) {
      return;
    }

    setSubmitting(true);
    const credentials = { email: email.trim(), password };
    const { data, error } = isSignIn
      ? await supabase.auth.signInWithPassword(credentials)
      : await supabase.auth.signUp(credentials);
    setSubmitting(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    if (!isSignIn && !data.session) {
      setInfo('Check your email to confirm the account, then sign in.');
      return;
    }

    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.form}>
        <Text style={styles.title}>Pocket Ledger</Text>
        <Text style={styles.subtitle}>
          {isSignIn ? 'Sign in to track spending.' : 'Create an account.'}
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          accessibilityLabel="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          testID="email-input"
          textContentType="emailAddress"
          value={email}
        />
        {showErrors && fieldErrors.email ? (
          <Text style={styles.error}>{fieldErrors.email}</Text>
        ) : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          accessibilityLabel="Password"
          autoCapitalize="none"
          autoComplete={isSignIn ? 'current-password' : 'new-password'}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          testID="password-input"
          textContentType={isSignIn ? 'password' : 'newPassword'}
          value={password}
        />
        {showErrors && fieldErrors.password ? (
          <Text style={styles.error}>{fieldErrors.password}</Text>
        ) : null}

        {formError ? <Text style={styles.error}>{formError}</Text> : null}
        {info ? <Text style={styles.info}>{info}</Text> : null}

        <Pressable
          accessibilityRole="button"
          disabled={submitting}
          onPress={onSubmit}
          style={styles.button}
        >
          {submitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>{isSignIn ? 'Sign in' : 'Create account'}</Text>
          )}
        </Pressable>

        <Link href={isSignIn ? '/sign-up' : '/sign-in'} style={styles.link}>
          {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111111',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111111',
    minHeight: 48,
  },
  error: {
    color: '#9b1c1c',
    fontSize: 14,
  },
  info: {
    color: '#111111',
    fontSize: 14,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 8,
    color: '#208AEF',
    fontSize: 15,
    textAlign: 'center',
  },
});
