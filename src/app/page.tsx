'use client';
import React from 'react';
import UserProvider, { UserContext } from '../providers/UserProvider';
import Login from '@/components/Login/Login';

import styles from './page.module.scss';
import Link from 'next/link';
import SearchContainer from '@/components/SearchContainer/SearchContainer';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, isLoggedIn } = React.useContext(UserContext);
  const [breeds, setBreeds] = React.useState<string[]>([]);

  React.useEffect(() => {
    async function getBreeds() {
      const res = await fetch('/api/dogs/breeds');
      const data = await res.json();
      setBreeds(data);
    }
    getBreeds();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Page</h1>
      <SearchContainer breeds={breeds} />
    </main>
  );
}
