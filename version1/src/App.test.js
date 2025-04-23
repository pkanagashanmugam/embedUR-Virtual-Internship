import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './pages/login'
test('renders home page', () => {
  render(<App />);
  const textElement = screen.getByText(/Welcome to the App/i);
  expect(textElement).toBeInTheDocument();
});

test('renders login form', () => {
  render(
      <Login />
  );

  const emailInput = screen.getByPlaceholderText(/Email/i);
  const passwordInput = screen.getByPlaceholderText(/Password/i);
  const loginButton = screen.getByRole('button', { name: /Sign in/i });

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});