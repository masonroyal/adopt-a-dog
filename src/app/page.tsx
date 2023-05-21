'use client';
import React from 'react';
import UserProvider, { UserContext } from '../providers/UserProvider';
import Login from '@/components/Login/Login';

import styles from './page.module.scss';

export default function Home() {
  const { user, isLoggedIn } = React.useContext(UserContext);

  return (
    <main className={styles.main}>
      <h1>Page</h1>
      {user === null ? <div>Not logged in</div> : <div>Logged in</div>}
    </main>
  );
}
