'use client';

import * as React from 'react';
import { UserContext } from '@/providers/UserProvider';
import Input from '@/components/Input/Input';

import styles from './SearchForm.module.scss';
import InputSelect from '../InputSelect/InputSelect';
import InputMultiSelect from '../InputMultiSelect/InputMultiSelect';
import Button from '../Button/Button';
import SearchLocation from '../SearchLocation/SearchLocation';

interface SearchFormProps {
  breeds: string[];
  chosenBreeds: string[];
  setChosenBreeds: React.Dispatch<React.SetStateAction<string[]>>;
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
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  states: string[];
  setStates: React.Dispatch<React.SetStateAction<string[]>>;
  distanceSize: string;
  setDistanceSize: React.Dispatch<React.SetStateAction<string>>;
  geo: any;
  setGeo: React.Dispatch<React.SetStateAction<any>>;
  map: any;
  setMap: React.Dispatch<React.SetStateAction<any>>;
  searchMethod: boolean;
  setSearchMethod: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchForm({
  breeds,
  chosenBreeds,
  setChosenBreeds,
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
  handleSearch,
  city,
  setCity,
  states,
  setStates,
  distanceSize,
  setDistanceSize,
  geo,
  setGeo,
  map,
  setMap,
  searchMethod,
  setSearchMethod,
}: SearchFormProps) {
  const { user, isLoggedIn } = React.useContext(UserContext);

  return (
    <form className={styles.wrapper} onSubmit={handleSearch}>
      <h2>Search for dogs</h2>
      <h3>Location to search: </h3>
      <SearchLocation
        city={city}
        setCity={setCity}
        states={states}
        setStates={setStates}
        distanceSize={distanceSize}
        setDistanceSize={setDistanceSize}
        geo={geo}
        setGeo={setGeo}
        map={map}
        setMap={setMap}
        searchMethod={searchMethod}
        setSearchMethod={setSearchMethod}
      />
      <h3>Filters: </h3>
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
      <Button type="submit">Search</Button>
    </form>
  );
}

export default React.memo(SearchForm);
