import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders form label', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Город/i);
  expect(linkElement).toBeInTheDocument();
});
