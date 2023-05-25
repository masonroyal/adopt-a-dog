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
  const appliedClassName = `${className} ${styles.wrapper} `;
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
        <div>Breed: {dog.breed}</div>
        <div>Age: {dog.age}</div>
        <div>Zip: {dog.zip_code}</div>
        {children}
      </div>
    </Card>
  );
}

export default DogCard;
