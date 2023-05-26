'use client';
import * as React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { UserContext, logoutStaleUser } from '@/providers/UserProvider';

import SearchForm from '@/components/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import fetcher from '@/utils/fetcher';
import FavoriteDogs from '../FavoriteDogs/FavoriteDogs';
import { toast } from 'react-hot-toast';
import MatchedDog from '../MatchedDog/MatchedDog';

import { getDogIds, getDogsInfo } from '@/utils/searchHelpers';
import { Dog, GeoBounds } from '@/types';
import { API_ENDPOINT } from '@/utils/constants';
import styles from './SearchContainer.module.scss';
import { ChevronsLeft, ChevronsRight } from 'react-feather';
import SVGButton from '../SVGButton/SVGButton';

interface SearchContainerProps {}

function SearchContainer({}: SearchContainerProps) {
  const { user, isLoggedIn, setLogin } = React.useContext(UserContext);
  const [searchResults, setSearchResults] = React.useState<Dog[]>([]);
  const [nextPage, setNextPage] = React.useState('');
  const [prevPage, setPrevPage] = React.useState('');

  const [chosenBreeds, setChosenBreeds] = React.useState<string[]>([]);
  const [ageMin, setAgeMin] = React.useState('');
  const [ageMax, setAgeMax] = React.useState('');
  const [size, setSize] = React.useState('');
  const [currentSize, setCurrentSize] = React.useState('');
  const [sortField, setSortField] = React.useState('breed');
  const [sortDirection, setSortDirection] = React.useState('Ascending');

  // distance params
  const [city, setCity] = React.useState('');
  const [states, setStates] = React.useState('');
  const [map, setMap] = React.useState();
  const [geo, setGeo] = React.useState<GeoBounds | null>(null);
  const [searchMethod, setSearchMethod] = React.useState('City/State');
  const [numResults, setNumResults] = React.useState(0);
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(0);

  const [favoriteDogs, setFavoriteDogs] = React.useState<Dog[]>([]);
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [matchedDog, setMatchedDog] = React.useState<Dog | null>(null);
  const [showMatchedDog, setShowMatchedDog] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement | null>(null);

  const { push } = useRouter();

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const {
    data: breeds = [],
    error,
    isLoading,
  } = useSWR(isLoggedIn ? `${API_ENDPOINT}/dogs/breeds` : null, () =>
    fetcher(`${API_ENDPOINT}/dogs/breeds`, fetchOptions)
  );

  React.useEffect(() => {
    if (!isLoggedIn) {
      push('/login');
    }
  }, [isLoggedIn]);

  if (error) {
    console.error('Error: ', error);

    if (error.status === 401) {
      logoutStaleUser(setLogin);
      toast.error('Please log in to view this page');
      push('/login'), 1000;
    }

    return (
      <div className={styles.error}>
        Failed to load. Please log in and try again.
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function handleSettingFavorites(dog: Dog) {
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

  async function handlePrevAndNext(url: string) {
    try {
      // remove square brackets from url
      const regex = /%5B\d+%5D=(\d+)/g;
      const filteredUrl = url.replace(regex, (match, zipCode) => `=${zipCode}`);

      // get size param from url
      const parsedUrl = new URL(`${API_ENDPOINT}${filteredUrl}`);
      const params = new URLSearchParams(parsedUrl.search);

      const currentParamSize = params.get('size') || '25';

      setCurrentSize(currentParamSize);

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

      setPrevPage(data.prev);
      setNextPage(data.next);

      if (url === nextPage) {
        setStartIndex(endIndex + 1);
        const newEndIndex = Math.min(
          endIndex + (data.length, Number(currentSize) || 25)
        );
        setEndIndex(Math.min(newEndIndex, numResults));
      } else if (url === prevPage) {
        setEndIndex(startIndex - 1);
        const newStartIndex = Math.min(
          startIndex - (data.length, Number(currentSize) || 25)
        );
        setStartIndex(newStartIndex);
      }

      getDogsInfo(data.resultIds, setSearchResults);

      window.scrollTo({ top: 500, behavior: 'smooth' });
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const results = await getDogIds(
      searchMethod,
      city,
      states,
      geo,
      chosenBreeds,
      ageMin,
      ageMax,
      size,
      sortField,
      sortDirection,
      setPrevPage,
      setNextPage,
      setSearchResults,
      setNumResults
    );

    setCurrentSize(results.length.toString());

    setStartIndex(1);
    const newEndIndex = Math.min(results.length, Number(size) || 25);

    setEndIndex(newEndIndex);
  }

  function resetState() {
    setSearchResults([]);
    setNextPage('');
    setPrevPage('');
    setChosenBreeds([]);
    setAgeMin('');
    setAgeMax('');
    setSize('');
    setSortField('breed');
    setSortDirection('Ascending');
    setCity('');
    setStates('');
    setMap(undefined);
    setGeo(null);
    setSearchMethod('City/State');
    setNumResults(0);
    setFavoriteDogs([]);
    setShowFavorites(false);
    setMatchedDog(null);
    setShowMatchedDog(false);
  }

  return (
    <div className={styles.wrapper}>
      {matchedDog && showMatchedDog ? (
        <MatchedDog matchedDog={matchedDog} resetState={resetState} />
      ) : (
        <>
          <SearchForm
            ref={formRef}
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
            numResults={numResults}
            favoriteDogsLength={favoriteDogs.length}
            setShowFavorites={setShowFavorites}
          />
          {showFavorites && (
            <FavoriteDogs
              setShowFavorites={setShowFavorites}
              favoriteDogs={favoriteDogs}
              handleSettingFavorites={handleSettingFavorites}
              setMatchedDog={setMatchedDog}
              setShowMatchedDog={setShowMatchedDog}
              setFavoriteDogs={setFavoriteDogs}
            />
          )}
          <div className={styles.searchResultsContainer}>
            {searchResults.length > 0 && (
              <>
                <SearchResults
                  className={styles.searchResults}
                  searchResults={searchResults}
                  handleSettingFavorites={handleSettingFavorites}
                />
                <div className={styles.buttonHolder}>
                  {prevPage && (
                    <SVGButton
                      IconComponent={ChevronsLeft}
                      className={styles.prev}
                      onClick={() => handlePrevAndNext(prevPage)}
                      text={`Prev ${currentSize || 25}`}
                    />
                  )}
                  {nextPage && endIndex < numResults && (
                    <SVGButton
                      IconComponent={ChevronsRight}
                      className={styles.next}
                      onClick={() => handlePrevAndNext(nextPage)}
                      text={`Next ${currentSize || 25}`}
                    />
                  )}
                </div>
                <div className={styles.currentResults}>
                  Showing results {startIndex} - {endIndex} of {numResults}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchContainer;
