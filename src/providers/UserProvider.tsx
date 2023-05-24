'use client';
import React from 'react';
import { API_ENDPOINT } from '@utils/constants';
import isValidEmail from '@/utils/validEmail';

interface UserContextProps {
  user: string;
  isLoggedIn: boolean;
  setLogin: (user: string, loggedIn: boolean) => void;
}

export const UserContext = React.createContext<UserContextProps>({
  user: '',
  isLoggedIn: false,
  setLogin: () => {},
});

export async function loginUser(
  event: React.FormEvent,
  name: string,
  email: string,
  setLogin: (user: string | null, loggedIn: boolean) => void
) {
  event.preventDefault();

  if (!isValidEmail(email)) {
    throw new Error('Invalid email');
  }

  const response = await fetch(`${API_ENDPOINT}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  setLogin(name, true);
  console.log({ response });

  return response;
}

export async function logoutUser(
  setLogin: (user: string, loggedIn: boolean) => void
) {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    console.log({ response });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    setLogin('', false);

    return response.status;
  } catch (error) {
    console.error('Error logging out: ', error);
    return 'error';
  }
}

function UserProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = React.useState<string>(() => {
    return localStorage.getItem('user') || '';
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true' || false;
  });

  const setLogin = React.useCallback((user: string, loggedIn: boolean) => {
    setUser(user);
    localStorage.setItem('user', user);
    setIsLoggedIn(loggedIn);
    localStorage.setItem('isLoggedIn', String(loggedIn));
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
