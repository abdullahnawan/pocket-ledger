import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket Ledger</Text>
      <Text style={styles.subtitle}>Nothing here yet. Quick add comes next.</Text>
    </View>
  );
}

// Fixed light colors on purpose: a color-scheme branch here renders differently on
// the server than on the client, which breaks web hydration. Theming comes in Phase 11.
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
});
