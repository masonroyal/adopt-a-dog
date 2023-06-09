import * as React from 'react';
import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  const cardClassName = `${styles.wrapper} ${className}`;
  return <article className={cardClassName}>{children}</article>;
}

export default Card;
