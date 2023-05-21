'use client';

import * as React from 'react';
import { UserContext } from '@/providers/UserProvider';
import Input from '@/components/Input/Input';

import styles from './SearchContainer.module.scss';

interface SearchContainerProps {
  breeds: string[];
}

function SearchContainer({ breeds }: SearchContainerProps) {
  const { user, isLoggedIn } = React.useContext(UserContext);
  const [chosenBreeds, setChosenBreeds] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [ageMin, setAgeMin] = React.useState('');
  const [ageMax, setAgeMax] = React.useState('');

  function createHandler(setter: React.Dispatch<React.SetStateAction<string>>) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };
  }

  // if (!user) {
  //   return <div>Not logged in</div>;
  // }
  return (
    <div className={styles.wrapper}>
      <Input
        label="Search: "
        value={search}
        placeholder="Search for a dog"
        onChange={createHandler(setSearch)}
      />
      <Input
        label="Zip Code: "
        value={zipCode}
        placeholder="Enter your zip code"
        onChange={createHandler(setZipCode)}
      />
      <Input
        label="Min Age: "
        value={ageMin}
        placeholder="Enter the minimum age"
        onChange={createHandler(setAgeMin)}
      />
      <Input
        label="Max Age: "
        value={ageMax}
        placeholder="Enter the maximum age"
        onChange={createHandler(setAgeMax)}
      />
    </div>
  );
}

export default SearchContainer;
