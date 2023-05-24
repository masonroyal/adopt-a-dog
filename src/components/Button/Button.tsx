import * as React from 'react';
import styles from './Button.module.scss';

function Button({className = '', ...delegated}) {
  return (
    <button
      className={`${styles.button} ${className}`}
      {...delegated}
    />
  );
}

export default Button;
