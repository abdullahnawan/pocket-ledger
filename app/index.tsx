import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';

export default function Index() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setEmail(data.session?.user.email ?? null);
    });
  }, []);

  if (email === undefined) {
    return <View style={styles.container} />;
  }

  if (!email) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pocket Ledger</Text>
        <Text style={styles.subtitle}>Sign in to start tracking spending.</Text>
        <Link href="/sign-in" style={styles.link}>
          Sign in
        </Link>
        <Link href="/sign-up" style={styles.link}>
          Create an account
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket Ledger</Text>
      <Text style={styles.subtitle}>Signed in as {email}</Text>
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
  link: {
    color: '#208AEF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
});
