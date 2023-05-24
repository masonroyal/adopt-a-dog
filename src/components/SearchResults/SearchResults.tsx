import * as React from 'react';

import styles from './SearchResults.module.scss';
import Image from 'next/image';
import Card from '../Card/Card';
import { Dog } from '@/types';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import DogCard from '../DogCard/DogCard';

interface SearchResultsProps {
  searchResults: Dog[];
  handleSettingFavorites: (dog: Dog) => void;
}

function SearchResults({
  searchResults,
  handleSettingFavorites,
}: SearchResultsProps) {
  return (
    <div className={styles.wrapper}>
      {searchResults.map((dog) => {
        return (
          <DogCard key={dog.id} dog={dog}>
            <InputCheckbox
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
