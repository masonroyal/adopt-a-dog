import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginPage from '@/app/login/page';
import UserProvider, { UserContext, loginUser } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockPush = jest.fn();
// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

test('renders without crashing', () => {
  render(<LoginPage />);
});

test('allows the user to fill out the form', async () => {
  const user = userEvent.setup();

  render(<LoginPage />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  await user.click(nameInput);
  await user.keyboard('test');
  await user.click(emailInput);
  await user.keyboard('test@test.com');

  expect(nameInput).toHaveValue('test');
  expect(emailInput).toHaveValue('test@test.com');
});

test('clears form after submission', async () => {
  const user = userEvent.setup();

  render(<LoginPage />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button', { name: /log in/i });

  await user.click(nameInput);
  await user.keyboard('test');
  await user.click(emailInput);
  await user.keyboard('test@test.com');

  await user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});

test('name input only accepts letters', async () => {
  const user = userEvent.setup();
  const loginUser = jest.fn();

  render(<LoginPage />);
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button', { name: /log in/i });

  const form = screen.getByTestId('login-form');

  form.onsubmit = loginUser;

  await user.click(nameInput);
  await user.keyboard('123');
  await user.click(emailInput);
  await user.keyboard('test@test.com');
  await user.click(button);

  expect(nameInput).toHaveValue('123');
  expect(loginUser).not.toHaveBeenCalled();
});

test('email input only accepts valid email addresses', async () => {
  const user = userEvent.setup();
  const loginUser = jest.fn();

  render(<LoginPage />);
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button', { name: /log in/i });

  const form = screen.getByTestId('login-form');

  form.onsubmit = loginUser;

  await user.click(nameInput);
  await user.keyboard('test');
  await user.click(emailInput);
  await user.keyboard('test');
  await user.click(button);

  expect(emailInput).toHaveValue('test');
  expect(loginUser).not.toHaveBeenCalled();
});

test("doesn't allow submission of incomplete forms", async () => {
  const user = userEvent.setup();
  const loginUser = jest.fn();

  render(<LoginPage />);
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button', { name: /log in/i });

  const form = screen.getByTestId('login-form');

  form.onsubmit = loginUser;

  await user.click(emailInput);
  await user.keyboard('test@test.com');
  await user.click(button);

  expect(emailInput).toHaveValue('test@test.com');
  expect(loginUser).not.toHaveBeenCalled();
});

test('redirects to / on successful login', async () => {
  const user = userEvent.setup();

  render(<LoginPage />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button', { name: /log in/i });

  await user.click(nameInput);
  await user.keyboard('test');
  await user.click(emailInput);
  await user.keyboard('test@test.com');
  await user.click(button);

  expect(mockPush).toHaveBeenCalledWith('/');
});
