import * as React from 'react';
import Card from '../Card/Card';
import Image from 'next/image';

import styles from './DogCard.module.scss';
import { Dog } from '@/types';

interface DogCardProps {
  dog: Dog;
  className?: string;
  children?: React.ReactNode;
}

function DogCard({ dog, className = '', children }: DogCardProps) {
  const appliedClassName = `${styles.wrapper} ${className}`;
  return (
    <Card key={dog.id} className={appliedClassName}>
      <div className={styles.cardTop}>
        <Image
          src={dog.img}
          alt={dog.breed}
          width={1000}
          height={1000}
          className={styles.dogImage}
        />
      </div>
      <div className={styles.cardBottom}>
        <h3>{dog.name}</h3>
        <div>
          {dog.age} years old · {dog.breed}
        </div>
        <div>Zip Code: {dog.zip_code}</div>
      </div>
      {children}
    </Card>
  );
}

export default DogCard;
