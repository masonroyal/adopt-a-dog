import * as React from 'react';
import Card from '../Card/Card';
import Image from 'next/image';

import styles from './DogCard.module.scss';
import { Dog } from '@/types';

interface DogCardProps {
  dog: Dog;
  children?: React.ReactNode;
}

function DogCard({ dog, children }: DogCardProps) {
  return (
    <div>
      <Card key={dog.id} className={styles.dogContainer}>
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
    </div>
  );
}

export default DogCard;
