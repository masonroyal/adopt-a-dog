'use client';

import * as React from 'react';
import { UserContext } from '@/providers/UserProvider';

import styles from './SearchContainer.module.scss';
import SearchForm from '@/components/SearchForm';
import { API_ENDPOINT } from '@/utils/constants';
import SearchResults from '../SearchResults/SearchResults';
import Button from '../Button/Button';

interface SearchContainerProps {
  breeds: string[];
}

function SearchContainer({ breeds }: SearchContainerProps) {
  const { user, isLoggedIn } = React.useContext(UserContext);

  const [searchResults, setSearchResults] = React.useState([]);
  const [nextPage, setNextPage] = React.useState('');
  const [prevPage, setPrevPage] = React.useState('');

  const [chosenBreeds, setChosenBreeds] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [ageMin, setAgeMin] = React.useState('');
  const [ageMax, setAgeMax] = React.useState('');
  const [size, setSize] = React.useState('');
  const [sort, setSort] = React.useState('');

  function createParameters() {
    //https://frontend-take-home-service.fetch.com/dogs?breeds=Pug&breeds=Beagle&ageMin=4&ageMax=12&size=Small&sort=Ascending
    let parameters = '';
    if (chosenBreeds.length > 0) {
      for (let i = 0; i < chosenBreeds.length; i++) {
        parameters += `&breeds=${chosenBreeds[i]}`;
      }
    }
    if (ageMin !== '') {
      parameters += `&ageMin=${ageMin}`;
    }
    if (ageMax !== '') {
      parameters += `&ageMax=${ageMax}`;
    }
    if (size !== '') {
      parameters += `&size=${size}`;
    }
    if (sort !== '') {
      parameters += `&sort=${sort}`;
    }
    return parameters;
  }

  async function getDogIds() {
    try {
      const parameters = createParameters();

      const response = await fetch(
        `${API_ENDPOINT}/dogs/search?${parameters}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Error in getDogIds');
      }

      const data = await response.json();
      console.log({ data });

      setPrevPage(data.prev);
      setNextPage(data.next);

      getDogsInfo(data.resultIds);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async function getDogsInfo(ids: string[]) {
    try {
      // TODO: check and limit to 100 dogs
      const response = await fetch(`${API_ENDPOINT}/dogs`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(ids),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error in getDogsInfo');
      }

      const data = await response.json();
      console.log({ data });
      setSearchResults(data);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async function handlePrevAndNext(url: string) {
    try {
      const response = await fetch(`${API_ENDPOINT}${url}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error in handlePrevAndNext');
      }

      const data = await response.json();

      console.log({ data });

      setPrevPage(data.prev);
      setNextPage(data.next);

      getDogsInfo(data.resultIds);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getDogIds();
  }

  return (
    <div className={styles.wrapper}>
      <SearchForm
        breeds={breeds}
        chosenBreeds={chosenBreeds}
        setChosenBreeds={setChosenBreeds}
        search={search}
        setSearch={setSearch}
        zipCode={zipCode}
        setZipCode={setZipCode}
        ageMin={ageMin}
        setAgeMin={setAgeMin}
        ageMax={ageMax}
        setAgeMax={setAgeMax}
        size={size}
        setSize={setSize}
        sort={sort}
        setSort={setSort}
        handleSearch={handleSearch}
      />
      {searchResults.length > 1 && (
        <SearchResults searchResults={searchResults} />
      )}
      {prevPage && (
        <Button url={prevPage} onClick={() => handlePrevAndNext(prevPage)}>
          Previous
        </Button>
      )}
      {nextPage && (
        <Button url={nextPage} onClick={() => handlePrevAndNext(nextPage)}>
          Next
        </Button>
      )}
    </div>
  );
}

export default SearchContainer;
