import { Redirect } from 'expo-router';
import { View } from 'react-native';

import { AuthForm } from '@/features/auth/AuthForm';
import { useAuth } from '@/features/auth/AuthProvider';

export default function SignInScreen() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return <View />;
  }

  if (session) {
    return <Redirect href="/" />;
  }

  return <AuthForm mode="sign-in" />;
}
