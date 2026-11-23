import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { Pressable, Text } from 'react-native';

import { AuthProvider, useAuth } from '@/features/auth/AuthProvider';
import { supabase } from '@/lib/supabase';

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

const getSession = supabase.auth.getSession as jest.Mock;
const onAuthStateChange = supabase.auth.onAuthStateChange as jest.Mock;
const signOut = supabase.auth.signOut as jest.Mock;

function Probe() {
  const { session, isLoading, signOut: onSignOut } = useAuth();

  if (isLoading) {
    return <Text>loading</Text>;
  }

  return (
    <>
      <Text>{session?.user.email ?? 'signed-out'}</Text>
      <Pressable accessibilityRole="button" onPress={() => void onSignOut()}>
        <Text>Sign out</Text>
      </Pressable>
    </>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    getSession.mockReset();
    onAuthStateChange.mockReset();
    signOut.mockReset();
    onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    });
  });

  it('exposes the restored session after getSession resolves', async () => {
    getSession.mockImplementation(() =>
      Promise.resolve({
        data: { session: { user: { email: 'user@example.com' } } },
      }),
    );

    await render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('user@example.com')).toBeOnTheScreen();
    });
  });

  it('calls supabase.auth.signOut when Sign out is pressed', async () => {
    const user = userEvent.setup();
    getSession.mockImplementation(() =>
      Promise.resolve({
        data: { session: { user: { email: 'user@example.com' } } },
      }),
    );
    signOut.mockResolvedValue({ error: null });

    await render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('user@example.com')).toBeOnTheScreen();
    });
    await user.press(screen.getByRole('button', { name: 'Sign out' }));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});
