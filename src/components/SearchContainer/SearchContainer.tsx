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
  const [sortField, setSortField] = React.useState('breed');
  const [sortDirection, setSortDirection] = React.useState('Ascending');

  // distance params
  const [city, setCity] = React.useState('');
  const [states, setStates] = React.useState<string[]>([]);
  const [map, setMap] = React.useState();
  const [geo, setGeo] = React.useState<GeoBounds | null>(null);
  const [searchMethod, setSearchMethod] = React.useState('City/State');
  const [numResults, setNumResults] = React.useState(0);

  const [favoriteDogs, setFavoriteDogs] = React.useState<Dog[]>([]);
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [matchedDog, setMatchedDog] = React.useState<Dog | null>(null);
  const [showMatchedDog, setShowMatchedDog] = React.useState(false);

  const [showPrevNext, setShowPrevNext] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const { push } = useRouter();

  // create intersection observer to show/hide prev/next buttons
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setShowPrevNext(true);
        } else {
          setShowPrevNext(false);
        }
      },
      { threshold: 0.7 }
    );

    const currentFormRef = formRef.current;

    if (currentFormRef) {
      observer.observe(currentFormRef);
    }

    return () => {
      if (currentFormRef) {
        observer.unobserve(currentFormRef);
      }
    };
  }, []);

  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const {
    data: breeds,
    error,
    isLoading,
  } = useSWR(`${API_ENDPOINT}/dogs/breeds`, () =>
    fetcher(`${API_ENDPOINT}/dogs/breeds`, fetchOptions)
  );

  if (error) {
    console.log({ error });

    console.log('Error Status:', error.status);
    if (error.status === 401) {
      // TODO: how to redirect without having the error on first log in?
      toast.error('Please log in to view this page');
      logoutStaleUser(setLogin);
      // localStorage.setItem('user', '');
      // localStorage.setItem('isLoggedIn', String(false));
    }

    return <div>Failed to load. Please log in and try again.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

      getDogsInfo(data.resultIds, setSearchResults);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await getDogIds(
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
  }

  return (
    <div className={styles.wrapper}>
      {matchedDog && showMatchedDog ? (
        <MatchedDog matchedDog={matchedDog} />
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
          {showFavorites && favoriteDogs.length > 1 && (
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
            {showPrevNext && prevPage && (
              <SVGButton
                IconComponent={ChevronsLeft}
                className={styles.prev}
                onClick={() => handlePrevAndNext(nextPage)}
                text={`Prev ${size || 25}`}
              />
            )}
            {searchResults.length > 1 && (
              <SearchResults
                className={styles.searchResults}
                searchResults={searchResults}
                handleSettingFavorites={handleSettingFavorites}
              />
            )}
            {showPrevNext && nextPage && numResults > 25 && (
              <SVGButton
                IconComponent={ChevronsRight}
                className={styles.next}
                onClick={() => handlePrevAndNext(nextPage)}
                text={`Next ${size || 25}`}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchContainer;
