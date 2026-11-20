import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Large-phone width. Real phones are already narrower, so this only
// letterboxes a desktop browser. See docs/decisions/001-phone-layout-web-preview.md.
const PHONE_MAX_WIDTH = 430;

export default function RootLayout() {
  return (
    <SafeAreaProvider style={styles.provider}>
      <View style={styles.preview}>
        <View style={styles.phone}>
          <Stack />
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  provider: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Platform.OS === 'web' ? '#d9d9d9' : '#ffffff',
  },
  phone: {
    flex: 1,
    width: '100%',
    maxWidth: PHONE_MAX_WIDTH,
    backgroundColor: '#ffffff',
  },
});
