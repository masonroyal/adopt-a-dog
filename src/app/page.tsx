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

export default function Home() {
  const { user, isLoggedIn } = React.useContext(UserContext);
  const {
    data: breeds,
    error,
    isLoading,
  } = useSWR(`${API_ENDPOINT}/dogs/breeds`, fetcher);

  if (error) {
    return <div>Failed to load</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <h1>Page</h1>
      {breeds.length > 0 && <SearchContainer breeds={breeds} />}
    </main>
  );
}
