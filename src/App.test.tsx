import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />',()=>{
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/title/i);
  expect(linkElement).toBeInTheDocument();
  const element = screen.getByTestId('custom-element');
  expect(element).toBeInTheDocument();
});
});