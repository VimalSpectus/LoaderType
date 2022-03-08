import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import App from './App';

describe('<App />',()=>{
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/title/i);
  expect(linkElement).toBeInTheDocument();
  const element = screen.getByTestId('custom-element');
  expect(element).toBeInTheDocument();
});
test('data is initially not present', async () => {
  const{getByTestId}=render(<App />);
  await getByTestId('custom-element');
  await waitFor(() => {
    expect(getByTestId('custom-element')).toBeInTheDocument()
  });
});
});