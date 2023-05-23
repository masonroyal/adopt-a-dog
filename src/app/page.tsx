'use client';
import React from 'react';
import useSWR from 'swr';
import UserProvider, { UserContext } from '../providers/UserProvider';

import styles from './page.module.scss';
import Link from 'next/link';
import SearchContainer from '@/components/SearchContainer/SearchContainer';
import { redirect } from 'next/navigation';
import { API_ENDPOINT } from '@/utils/constants';
import fetcher from '@/utils/fetcher';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoggedIn } = React.useContext(UserContext);
  const router = useRouter();
  const { push } = router;

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const {
    data: breeds,
    error,
    isLoading,
  } = useSWR(`${API_ENDPOINT}/dogs/breeds`, () =>
    fetcher(`${API_ENDPOINT}/dogs/breeds`, fetchOptions)
  );

  if (error) {
    console.log({ error });

    console.log('Error Status:', error.status);
    if (error.status === 401) {
      // TODO: pop up saying please log in
      push('/login');
    }

    return <div>Failed to load</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      {breeds.length > 0 && <SearchContainer breeds={breeds} />}
    </main>
  );
}
