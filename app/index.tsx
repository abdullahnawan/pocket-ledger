import { Redirect } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/features/auth/AuthProvider';

export default function Index() {
  const { session, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          accessibilityLabel="Checking sign-in"
          color="#208AEF"
          testID="auth-loading"
        />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket Ledger</Text>
      <Text style={styles.subtitle}>Signed in as {session.user.email}</Text>
      <Text style={styles.hint}>Purchase entry comes next.</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          void signOut();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111111',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666666',
  },
  hint: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888888',
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#208AEF',
    borderRadius: 10,
    minHeight: 48,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
