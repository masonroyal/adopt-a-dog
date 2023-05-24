import * as React from 'react';
import Card from '../Card/Card';

import styles from './FavoriteDogs.module.scss';
import Image from 'next/image';
import { Dog } from '@/types';
import Button from '../Button/Button';
import DogCard from '../DogCard/DogCard';

interface FavoriteDogsProps {
  favoriteDogs: Dog[];
  submitFavoriteDogs: () => void;
}

function FavoriteDogs({ favoriteDogs, submitFavoriteDogs }: FavoriteDogsProps) {
  // TODO: deselect and clear favorite dogs
  return (
    <div className={styles.wrapper}>
      {favoriteDogs.map((dog) => {
        return <DogCard key={dog.id} dog={dog}></DogCard>;
      })}
      <Button onClick={submitFavoriteDogs}>Submit dogs for matching</Button>
    </div>
  );
}

export default FavoriteDogs;
