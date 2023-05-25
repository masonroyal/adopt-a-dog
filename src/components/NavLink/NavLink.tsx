import * as React from 'react';
import Link from 'next/link';

import styles from './NavLink.module.scss';

interface NavLinkProps<T> {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delegated?: T;
}

function NavLink<T>({
  href,
  children,
  className,
  ...delegated
}: NavLinkProps<T>) {
  if (href) {
    return (
      <Link className={styles.navLink} href={href} {...delegated}>
        {children}
      </Link>
    );
  }
  return (
    <button className={styles.navLink} {...delegated}>
      {children}
    </button>
  );
}

export default NavLink;
