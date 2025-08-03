import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function SampleComponent() {
  return <div>Hello, Jest!</div>;
}

test('renders greeting', () => {
  render(<SampleComponent />);
  expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
});
