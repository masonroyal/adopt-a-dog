'use client';

import * as React from 'react';
import { UserContext } from '@/providers/UserProvider';
import useSWR from 'swr';

import styles from './SearchContainer.module.scss';
import SearchForm from '@/components/SearchForm';
import { API_ENDPOINT } from '@/utils/constants';
import SearchResults from '../SearchResults/SearchResults';
import Button from '../Button/Button';
import fetcher from '@/utils/fetcher';
import FavoriteDogs from '../FavoriteDogs/FavoriteDogs';
import { Dog } from '@/types';
import { toast } from 'react-hot-toast';
import MatchedDog from '../MatchedDog/MatchedDog';

interface SearchContainerProps {
  breeds: string[];
}

interface GeoBounds {
  top_left: {
    lat: number;
    lon: number;
  };
  bottom_right: {
    lat: number;
    lon: number;
  };
}

function SearchContainer({ breeds }: SearchContainerProps) {
  const { user, isLoggedIn } = React.useContext(UserContext);

  const [searchResults, setSearchResults] = React.useState([]);
  const [nextPage, setNextPage] = React.useState('');
  const [prevPage, setPrevPage] = React.useState('');

  const [chosenBreeds, setChosenBreeds] = React.useState<string[]>([]);
  const [zipCode, setZipCode] = React.useState('');
  const [ageMin, setAgeMin] = React.useState('');
  const [ageMax, setAgeMax] = React.useState('');
  const [size, setSize] = React.useState('');
  const [sortField, setSortField] = React.useState('breed');
  const [sortDirection, setSortDirection] = React.useState('Ascending');

  // distance params
  const [city, setCity] = React.useState('');
  const [states, setStates] = React.useState<string[]>([]);
  const [map, setMap] = React.useState();
  const [geo, setGeo] = React.useState<GeoBounds | null>(null);
  const [searchMethod, setSearchMethod] = React.useState('City/State');

  const [favoriteDogs, setFavoriteDogs] = React.useState<Dog[]>([]);

  const [matchedDog, setMatchedDog] = React.useState<Dog | null>(null);
  

  function handleSettingFavorites(dog: Dog) {
    // TODO: where did I get the number 10? Is it correct?
    if (favoriteDogs.length > 10) {
      throw new Error('You can only have 10 favorites');
    }

    const dogId = dog.id;

    const newArray = [...favoriteDogs];
    // iterate through array of obj
    for (const currentDog of newArray) {
      // if current dog's id is equal to dogId
      if (currentDog.id === dogId) {
        // remove current dog from array
        const index = newArray.indexOf(currentDog);
        newArray.splice(index, 1);
        setFavoriteDogs(newArray);
        toast.success('Dog removed from favorites');
        return;
      }
    }

    newArray.push(dog);

    toast.success('Dog added to favorites!');

    setFavoriteDogs(newArray);
  }

  async function submitFavoriteDogs() {
    try {
      const response = await fetch(`${API_ENDPOINT}/dogs/match`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteDogs),
      });

      if (!response.ok) {
        throw new Error('Post request did not complete successfully');
      }

      const data = await response.json();

      console.log('matched dog: ', data);
      console.log(data.match);

      setMatchedDog(data.match);

      return data;
    } catch (error) {
      toast.error('Error submitting selected dogs');
      console.error('Error submitting selected dogs: ', error);
    }
  }

  function createParameters() {
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

    const sortBy = sortField === 'breed' ? 'breed' : 'age';
    const sortMethod = sortDirection === 'Ascending' ? 'asc' : 'desc';

    parameters += `&sort=${sortBy}:${sortMethod}`;

    return parameters;
  }

  async function getDogIds() {
    try {
      // get locations
      const locationResponse = await fetch(`${API_ENDPOINT}/locations/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          city: city && searchMethod === 'City/State' ? city : null,
          states:
            states.length > 0 && searchMethod === 'City/State' ? states : null,
          size: 100,
          geoBoundingBox: geo && searchMethod === 'Map' ? geo : null,
        }),
      });

      if (!locationResponse.ok) {
        throw new Error('Error in location search');
      }

      let zipCodes = [];

      if (city || states.length > 0 || (geo && searchMethod === 'Map')) {
        const locationData = await locationResponse.json();
        console.log({ locationData });

        zipCodes = locationData.results.map(
          (location: { zip_code: string }) => location.zip_code
        );
      }

      let parameters = createParameters();

      for (let i = 0; i < zipCodes.length; i++) {
        parameters += `&zipCodes=${zipCodes[i]}`;
      }

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
      toast.error('Error loading dogs. Please try again');
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
      setSearchResults(data);
    } catch (error) {
      toast.error('Error loading dogs. Please try again');
      console.error('Error: ', error);
    }
  }

  async function handlePrevAndNext(url: string) {
    try {
      // remove square brackets from url
      const regex = /%5B\d+%5D=(\d+)/g;
      const filteredUrl = url.replace(regex, (match, zipCode) => zipCode);

      const response = await fetch(`${API_ENDPOINT}${filteredUrl}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
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
      {matchedDog && <MatchedDog matchedDog={matchedDog} />}
      <SearchForm
        breeds={breeds}
        chosenBreeds={chosenBreeds}
        setChosenBreeds={setChosenBreeds}
        ageMin={ageMin}
        setAgeMin={setAgeMin}
        ageMax={ageMax}
        setAgeMax={setAgeMax}
        size={size}
        setSize={setSize}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        handleSearch={handleSearch}
        // distance params
        city={city}
        setCity={setCity}
        states={states}
        setStates={setStates}
        map={map}
        setMap={setMap}
        geo={geo}
        setGeo={setGeo}
        searchMethod={searchMethod}
        setSearchMethod={setSearchMethod}
      />
      {favoriteDogs.length > 0 && (
        <FavoriteDogs
          favoriteDogs={favoriteDogs}
          submitFavoriteDogs={submitFavoriteDogs}
        />
      )}
      {searchResults.length > 1 && (
        <SearchResults
          searchResults={searchResults}
          handleSettingFavorites={handleSettingFavorites}
        />
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
