import * as React from 'react';
import Card from '../Card/Card';

import styles from './FavoriteDogs.module.scss';
import Image from 'next/image';
import { Dog } from '@/types';

interface FavoriteDogsProps {
  favoriteDogs: Dog[];
  submitFavoriteDogs: (dog: Dog) => void;
}

function FavoriteDogs({ favoriteDogs, submitFavoriteDogs }: FavoriteDogsProps) {
  return (
    <>
      {favoriteDogs.map((dog) => {
        return (
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
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default FavoriteDogs;
