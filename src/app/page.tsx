import Image from 'next/image';
import Login from '@/components/Login/Login';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Login />
    </main>
  );
}
