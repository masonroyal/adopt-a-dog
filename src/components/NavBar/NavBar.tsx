'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

import { UserContext, logoutUser } from '@/providers/UserProvider';

import styles from './NavBar.module.scss';
import NavLink from '../NavLink/NavLink';
import { toast } from 'react-hot-toast';

function NavBar() {
  const { user, isLoggedIn, setLogin } = React.useContext(UserContext);
  const router = useRouter();
  const { push } = router;

  //TODO: implement sign out
  async function handleLogout() {
    const status = await logoutUser(setLogin);
    toast.success('Logout successful');
    if (status === 200) {
      push('/login');
    } else {
      toast.error('Logout failed');
    }
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.left}>Adopt a Dog</div>

      <div className={styles.right}>
        {user === '' ? (
          <NavLink href="/login">Log In</NavLink>
        ) : (
          <>
            <p className={styles.user}>Hello {user}!</p>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
