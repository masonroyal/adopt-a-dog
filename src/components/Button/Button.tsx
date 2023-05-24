import * as React from 'react';

import styles from './Button.module.scss';

function Button({ className = '', ...delegated }) {
  const appliedClassName = `${styles.buttonStyling} ${className}`;
  return <button className={appliedClassName} {...delegated} />;
}

export default Button;
