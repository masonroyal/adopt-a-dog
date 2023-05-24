import * as React from 'react';

import styles from './FavoriteDogs.module.scss';
import { Dog } from '@/types';
import Button from '../Button/Button';
import DogCard from '../DogCard/DogCard';
import { submitFavoriteDogs } from '@/utils/searchHelpers';

interface FavoriteDogsProps {
  favoriteDogs: Dog[];
  setMatchedDog: (dog: Dog) => void;
}

function FavoriteDogs({ favoriteDogs, setMatchedDog }: FavoriteDogsProps) {
  // TODO: deselect and clear favorite dogs
  return (
    <div className={styles.wrapper}>
      {favoriteDogs.map((dog) => {
        return <DogCard key={dog.id} dog={dog}></DogCard>;
      })}
      <Button onClick={() => submitFavoriteDogs(favoriteDogs, setMatchedDog)}>
        Submit dogs for matching
      </Button>
    </div>
  );
}

export default FavoriteDogs;
