import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import UserProvider, { loginUser } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';

import { API_ENDPOINT } from '@/utils/constants';
import LoginPage from '@/app/login/page';
import React from 'react';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test('loginUser makes a fetch request and sets login state', async () => {
  const setLogin = jest.fn();
  const testUser = 'test';
  const testEmail = 'test@test.com';
  const mockSubmit = { preventDefault: () => {} } as React.FormEvent;

  await loginUser(mockSubmit, testUser, testEmail, setLogin);

  expect(setLogin).toHaveBeenCalledWith(testUser, true);
});

test('loginUser sets an access cookie on success', async () => {
  const setLogin = jest.fn();
  const testUser = 'test';
  const testEmail = 'test@test.com';
  const mockSubmit = { preventDefault: () => {} } as React.FormEvent;

  const response = await loginUser(mockSubmit, testUser, testEmail, setLogin);

  expect(document.cookie).toContain('fetch-access-token');
  expect(response.headers.get('Set-Cookie')).toContain(
    'fetch-access-token=123456789'
  );
});

test('loginUser sets an error message on failure', async () => {
  const setLogin = jest.fn();
  const testUser = 'test';
  const testEmail = 'wrongemail';
  const event = { preventDefault: () => {} } as React.FormEvent;

  await expect(loginUser(event, testUser, testEmail, setLogin)).rejects.toThrow(
    'Invalid email'
  );
});


test('logoutUser clears the access cookie on success', async () => {});
