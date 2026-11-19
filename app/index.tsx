import { StyleSheet, Text, View, useColorScheme } from 'react-native';

export default function Index() {
  const dark = useColorScheme() === 'dark';

  return (
    <View style={[styles.container, dark && styles.containerDark]}>
      <Text style={[styles.title, dark && styles.textDark]}>Pocket Ledger</Text>
      <Text style={[styles.subtitle, dark && styles.subtitleDark]}>
        Nothing here yet. Quick add comes next.
      </Text>
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
  containerDark: {
    backgroundColor: '#000000',
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
  textDark: {
    color: '#f2f2f2',
  },
  subtitleDark: {
    color: '#9b9b9b',
  },
});
