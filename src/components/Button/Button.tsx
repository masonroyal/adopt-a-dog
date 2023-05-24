import * as React from 'react';

import styles from './Button.module.scss';

function Button({ buttonType = 'primary', className = '', ...delegated }) {
  const appliedClassName = `${styles.buttonStyling} ${styles[buttonType]} ${className}`;
  return <button className={appliedClassName} {...delegated} />;
}

export default Button;
