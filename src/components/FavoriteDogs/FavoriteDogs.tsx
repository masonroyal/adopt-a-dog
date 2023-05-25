import * as React from 'react';

import styles from './FavoriteDogs.module.scss';
import { Dog } from '@/types';
import Button from '../Button/Button';
import DogCard from '../DogCard/DogCard';
import { submitFavoriteDogs } from '@/utils/searchHelpers';
import InputCheckbox from '../InputCheckbox/InputCheckbox';

interface FavoriteDogsProps {
  favoriteDogs: Dog[];
  setMatchedDog: (dog: Dog) => void;
  handleSettingFavorites: (dog: Dog) => void;
  setShowFavorites: (showFavorites: boolean) => void;
  setShowMatchedDog: (showMatchedDog: boolean) => void;
  setFavoriteDogs: (favoriteDogs: Dog[]) => void;
}

function FavoriteDogs({
  favoriteDogs,
  setMatchedDog,
  handleSettingFavorites,
  setShowFavorites,
  setShowMatchedDog,
  setFavoriteDogs,
}: FavoriteDogsProps) {
  return (
    <div className={styles.blur}>
      <div className={styles.wrapper}>
        <div className={styles.dogContainer}>
          {favoriteDogs.map((dog) => {
            return (
              <DogCard key={dog.id} dog={dog}>
                <InputCheckbox
                  className={styles.checkbox}
                  label="Unselect"
                  name="favorite"
                  value={dog.id}
                  data={dog}
                  onToggle={handleSettingFavorites}
                />
              </DogCard>
            );
          })}
        </div>
        <div className={styles.buttonHolder}>
          <Button
            buttonType="secondary"
            onClick={() => setShowFavorites(false)}
          >
            Back to search
          </Button>
          <Button
            onClick={() =>
              submitFavoriteDogs(
                favoriteDogs,
                setMatchedDog,
                setShowMatchedDog,
                setFavoriteDogs,
                setShowFavorites
              )
            }
          >
            Submit dogs for matching
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FavoriteDogs;
