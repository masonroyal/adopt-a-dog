'use client';
import React from 'react';

import styles from './page.module.scss';
import SearchContainer from '@/components/SearchContainer/SearchContainer';

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchContainer />
    </main>
  );
}
