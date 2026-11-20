import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('test setup', () => {
  it('renders a React Native component', async () => {
    await render(<Text>Pocket Ledger</Text>);

    expect(screen.getByText('Pocket Ledger')).toBeOnTheScreen();
  });
});
