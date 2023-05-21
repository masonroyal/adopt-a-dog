'use client';

import * as React from 'react';
import { UserContext } from '@/providers/UserProvider';
import Input from '@/components/Input/Input';

import styles from './SearchContainer.module.scss';
import InputSelect from '../InputSelect/InputSelect';

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
  const [size, setSize] = React.useState('');
  const [sort, setSort] = React.useState('Ascending');

  function createInputHandler(
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };
  }
  function createSelectHandler(
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    return (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        onChange={createInputHandler(setSearch)}
      />
      <Input
        label="Zip Code: "
        value={zipCode}
        placeholder="Enter your zip code"
        onChange={createInputHandler(setZipCode)}
      />
      <Input
        label="Min Age: "
        value={ageMin}
        placeholder="Enter the minimum age"
        onChange={createInputHandler(setAgeMin)}
      />
      <Input
        label="Max Age: "
        value={ageMax}
        placeholder="Enter the maximum age"
        onChange={createInputHandler(setAgeMax)}
      />
      <InputSelect
        value={size}
        label="Size: "
        onChange={createSelectHandler(setSize)}
        options={['', 'test1', 'test2']}
      />
      <InputSelect
        value={sort}
        label="Sort: "
        onChange={createSelectHandler(setSort)}
        options={['Ascending', 'Descending']}
      />
    </div>
  );
}

export default SearchContainer;
