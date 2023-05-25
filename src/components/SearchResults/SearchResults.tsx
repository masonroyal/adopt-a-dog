import * as React from 'react';

import { Dog } from '@/types';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import DogCard from '../DogCard/DogCard';

import styles from './SearchResults.module.scss';

interface SearchResultsProps {
  searchResults: Dog[];
  className?: string;
  handleSettingFavorites: (dog: Dog) => void;
}

function SearchResults({
  searchResults,
  handleSettingFavorites,
  className = '',
}: SearchResultsProps) {
  const appliedClassName = `${className} ${styles.wrapper} `;
  return (
    <div className={appliedClassName}>
      {searchResults.map((dog) => {
        return (
          <DogCard key={dog.id} dog={dog} className={styles.dogCard}>
            <InputCheckbox
              className={styles.checkbox}
              label="Select"
              name="favorite"
              value={dog.id}
              data={dog}
              onToggle={handleSettingFavorites}
            />
          </DogCard>
        );
      })}
    </div>
  );
}

export default SearchResults;
