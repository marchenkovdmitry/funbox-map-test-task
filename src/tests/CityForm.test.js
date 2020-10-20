import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders CityForm', () => {
  const { container } = render(<App />);
  const element = container.querySelector('form');
  expect(element).toBeInTheDocument();
});

test('renders CityForm label', () => {
  const { container } = render(<App />);
  const element = container.querySelector('label');
  expect(element).toBeInTheDocument();
});

test('renders form label text correctly', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Город/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders CityForm input', () => {
  const { container } = render(<App />);
  const element = container.querySelector('input');
  expect(element).toBeInTheDocument();
});
