'use client';
import React from 'react';
import { API_ENDPOINT } from '@utils/constants';
import isValidEmail from '@/utils/validEmail';

interface UserContextProps {
  user: string | null;
  isLoggedIn: boolean;
  setLogin: (user: string | null, loggedIn: boolean) => void;
}

let isLoggedIn = false;

export const UserContext = React.createContext<UserContextProps>({
  user: null,
  isLoggedIn,
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
  };

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

  return response;
}

export async function logoutUser() {
  const response = await fetch(`${API_ENDPOINT}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  console.log({ response });

  const parsedResponse = await response.json();

  console.log({ parsedResponse });

  return;
}

function UserProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = React.useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const setLogin = React.useCallback(
    (user: string | null, loggedIn: boolean) => {
      setUser(user);
      setIsLoggedIn(loggedIn);
    },
    []
  );

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
