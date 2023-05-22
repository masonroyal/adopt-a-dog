import * as React from 'react';

import styles from './SearchResults.module.scss';
import Image from 'next/image';
import Card from '../Card/Card';

interface SearchResultsProps {
  searchResults: {
    age: number;
    breed: string;
    id: string;
    img: string;
    zip_code: string;
  }[];
}

function SearchResults({ searchResults }: SearchResultsProps) {
  return (
    <div className={styles.wrapper}>
      {searchResults.map((dog) => {
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
    </div>
  );
}

export default SearchResults;
