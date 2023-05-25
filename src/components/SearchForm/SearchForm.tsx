'use client';

import * as React from 'react';
import { UserContext } from '@/providers/UserProvider';

import styles from './SearchForm.module.scss';
import InputSelect from '../InputSelect/InputSelect';
import InputMultiSelect from '../InputMultiSelect/InputMultiSelect';
import Button from '../Button/Button';
import SearchLocation from '../SearchLocation/SearchLocation';

interface SearchFormProps {
  breeds: string[];
  chosenBreeds: string[];
  setChosenBreeds: React.Dispatch<React.SetStateAction<string[]>>;
  ageMin: string;
  setAgeMin: React.Dispatch<React.SetStateAction<string>>;
  ageMax: string;
  setAgeMax: React.Dispatch<React.SetStateAction<string>>;
  size: string;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  states: string[];
  setStates: React.Dispatch<React.SetStateAction<string[]>>;
  geo: any;
  setGeo: React.Dispatch<React.SetStateAction<any>>;
  map: any;
  setMap: React.Dispatch<React.SetStateAction<any>>;
  searchMethod: string;
  setSearchMethod: React.Dispatch<React.SetStateAction<string>>;
  sortField: string;
  setSortField: React.Dispatch<React.SetStateAction<string>>;
  sortDirection: string;
  setSortDirection: React.Dispatch<React.SetStateAction<string>>;
  numResults: number;
  favoriteDogsLength: number;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchForm = React.forwardRef(
  (
    {
      breeds,
      chosenBreeds,
      setChosenBreeds,
      ageMin,
      setAgeMin,
      ageMax,
      setAgeMax,
      size,
      setSize,
      handleSearch,
      city,
      setCity,
      states,
      setStates,
      geo,
      setGeo,
      map,
      setMap,
      searchMethod,
      setSearchMethod,
      sortField,
      setSortField,
      sortDirection,
      setSortDirection,
      numResults,
      favoriteDogsLength,
      setShowFavorites,
    }: SearchFormProps,
    ref: React.Ref<HTMLFormElement>
  ) => {
    const { user, isLoggedIn } = React.useContext(UserContext);

    const minAgeOptions = [...Array(14).keys()].map((num) => num.toString());
    const maxAgeOptions = [...Array(16).keys()].map((num) => num.toString());

    return (
      <form className={styles.wrapper} onSubmit={handleSearch} ref={ref}>
        <h2>Find your new best friend today!</h2>
        <p className={styles.explanation}>
          Select up to 10 dogs. Submit your matches and one will be chosen for
          you to adopt!
        </p>
        <div className={styles.searchTop}>
          <div className={styles.locationSection}>
            <h4>Location: </h4>
            <SearchLocation
              city={city}
              setCity={setCity}
              states={states}
              setStates={setStates}
              geo={geo}
              setGeo={setGeo}
              map={map}
              setMap={setMap}
              searchMethod={searchMethod}
              setSearchMethod={setSearchMethod}
            />
          </div>
          <div className={styles.filterSection}>
            <h4>Filters: </h4>
            <InputMultiSelect
              className={styles.breedSelect}
              label="Breed(s): "
              value={chosenBreeds}
              options={breeds}
              setter={setChosenBreeds}
            />
            <div className={styles.ageSelection}>
              <InputSelect
                className={styles.ageSelect}
                label="Min Age: "
                value={ageMin}
                setter={setAgeMin}
                options={minAgeOptions}
              />
              <InputSelect
                className={styles.ageSelect}
                label="Max Age: "
                value={ageMax}
                // placeholder="Max age"
                setter={setAgeMax}
                options={maxAgeOptions}
              />
            </div>

            <div className={styles.sortSelection}>
              <InputSelect
                className={styles.sortSelect}
                value={sortField}
                label="Sort by: "
                setter={setSortField}
                options={['Breed', 'Age']}
              />
              <InputSelect
                className={styles.sortSelect}
                value={sortDirection}
                label="Sort direction: "
                setter={setSortDirection}
                options={['Ascending', 'Descending']}
              />
            </div>
            <InputSelect
              className={styles.sizeSelect}
              value={size}
              label="Number of results: "
              setter={setSize}
              options={['25', '50', '100']}
            />
          </div>
        </div>
        <div className={styles.searchBottom}>
          <div className={styles.buttonHolder}>
            <Button
              buttonType="secondary"
              onClick={() => setShowFavorites(true)}
            >
              Show {favoriteDogsLength} favorites
            </Button>
            <Button type="submit">Search</Button>
          </div>
          <p>
            {' '}
            {numResults > 0
              ? `${numResults} dogs found`
              : 'No dogs have been found, please start your search or adjust your parameters'}
          </p>
        </div>
      </form>
    );
  }
);

SearchForm.displayName = 'SearchForm';

export default React.memo(SearchForm);
