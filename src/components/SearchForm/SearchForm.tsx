'use client';

import * as React from 'react';
import { UserContext } from '@/providers/UserProvider';
import Input from '@/components/Input/Input';

import styles from './SearchForm.module.scss';
import InputSelect from '../InputSelect/InputSelect';
import InputMultiSelect from '../InputMultiSelect/InputMultiSelect';

interface SearchContainerProps {
  breeds: string[];
  chosenBreeds: string[];
  setChosenBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  ageMin: string;
  setAgeMin: React.Dispatch<React.SetStateAction<string>>;
  ageMax: string;
  setAgeMax: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

function SearchContainer({
  breeds,
  chosenBreeds,
  setChosenBreeds,
  search,
  setSearch,
  zipCode,
  setZipCode,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  size,
  setSize,
  sort,
  setSort,
}: SearchContainerProps) {
  const { user, isLoggedIn } = React.useContext(UserContext);

  return (
    <div className={styles.wrapper}>
      <Input
        label="Search: "
        value={search}
        placeholder="Search for a dog"
        setter={setSearch}
      />
      <Input
        label="Zip Code: "
        value={zipCode}
        placeholder="Enter your zip code"
        setter={setZipCode}
      />
      <Input
        label="Min Age: "
        value={ageMin}
        placeholder="Enter the minimum age"
        setter={setAgeMin}
      />
      <Input
        label="Max Age: "
        value={ageMax}
        placeholder="Enter the maximum age"
        setter={setAgeMax}
      />
      <InputSelect
        value={size}
        label="Number of results: "
        setter={setSize}
        options={['25', '50', '100']}
      />
      <InputSelect
        value={sort}
        label="Sort: "
        setter={setSort}
        options={['', 'Ascending', 'Descending']}
      />
      <InputMultiSelect
        label="Breed: "
        value={chosenBreeds}
        options={breeds}
        setter={setChosenBreeds}
      />
    </div>
  );
}

export default SearchContainer;
