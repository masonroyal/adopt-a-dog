import * as React from 'react';

import styles from './SVGButton.module.scss';

interface SVGButtonProps {
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
  text: string;
  onClick: () => void;
}

function SVGButton({
  IconComponent,
  className = '',
  text,
  onClick,
}: SVGButtonProps) {
  const appliedClassName = `${styles.wrapper} ${className}`;
  return (
    <button className={appliedClassName} onClick={onClick}>
      <IconComponent className={styles.icon} />
      <p className={styles.text}>{text}</p>
    </button>
  );
}

export default SVGButton;
