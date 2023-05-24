'use client';
import * as React from 'react';

import styles from './NavBar.module.scss';
import { UserContext } from '@/providers/UserProvider';

function NavBar() {
  const { user, isLoggedIn } = React.useContext(UserContext);

  return (
    <div className={styles.wrapper}>
      This is the nav
      <div>
        {user === null ? <div>Not logged in</div> : <div>Hello {user}!</div>}
      </div>
    </div>
  );
}

export default NavBar;
