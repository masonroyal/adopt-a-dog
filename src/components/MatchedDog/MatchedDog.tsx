import { Dog } from '@/types';
import * as React from 'react';

import DogCard from '../DogCard/DogCard';
import Button from '../Button/Button';

import styles from './MatchedDog.module.scss';

interface MatchedDogProps {
  matchedDog: Dog;
}

function MatchedDog({ matchedDog }: MatchedDogProps) {
  return (
    <div className={styles.wrapper}>
      <h2>🥳 Congratulations! 🥳</h2>
      <h3>You were matched with a beautiful dog!</h3>
      <DogCard
        key={matchedDog.id}
        dog={matchedDog}
        className={styles.dogCard}
      />
      <Button>Adopt now!</Button>
    </div>
  );
}

export default MatchedDog;
