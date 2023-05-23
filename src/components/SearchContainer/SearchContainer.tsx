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

interface SearchContainerProps {
  breeds: string[];
}

interface GeoBounds {
  top: number;
  right: number;
  bottom: number;
  left: number;
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
  const [sort, setSort] = React.useState('');

  // distance params
  const [city, setCity] = React.useState('');
  const [states, setStates] = React.useState<string[]>([]);
  const [distanceSize, setDistanceSize] = React.useState('');
  const [map, setMap] = React.useState();
  const [geo, setGeo] = React.useState<GeoBounds | null>(null);
  const [searchMethod, setSearchMethod] = React.useState('City/State');

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

        zipCodes = locationData.results.map((location) => location.zip_code);

        console.log({ zipCodes });
      }

      let parameters = createParameters();

      for (let i = 0; i < zipCodes.length; i++) {
        parameters += `&zipCodes=${zipCodes[i]}`;
      }

      console.log(
        'initial fetch url: ',
        `${API_ENDPOINT}/dogs/search?${parameters}`
      );

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
      <SearchForm
        breeds={breeds}
        chosenBreeds={chosenBreeds}
        setChosenBreeds={setChosenBreeds}
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
        // distance params
        city={city}
        setCity={setCity}
        states={states}
        setStates={setStates}
        distanceSize={distanceSize}
        setDistanceSize={setDistanceSize}
        map={map}
        setMap={setMap}
        geo={geo}
        setGeo={setGeo}
        searchMethod={searchMethod}
        setSearchMethod={setSearchMethod}
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

/*
https://frontend-take-home-service.fetch.com/dogs/search?&zipCodes=06001&zipCodes=06002&zipCodes=06006&zipCodes=06010&zipCodes=06011&zipCodes=06013&zipCodes=06016&zipCodes=06018&zipCodes=06019&zipCodes=06020&zipCodes=06021&zipCodes=06022&zipCodes=06023&zipCodes=06024&zipCodes=06025&zipCodes=06026&zipCodes=06027&zipCodes=06028&zipCodes=06029&zipCodes=06030&zipCodes=06031&zipCodes=06032&zipCodes=06033&zipCodes=06034&zipCodes=06035&zipCodes=06037&zipCodes=06039&zipCodes=06040&zipCodes=06041&zipCodes=06043&zipCodes=06045&zipCodes=06049&zipCodes=06050&zipCodes=06051&zipCodes=06052&zipCodes=06053&zipCodes=06057&zipCodes=06058&zipCodes=06059&zipCodes=06060&zipCodes=06061&zipCodes=06062&zipCodes=06063&zipCodes=06064&zipCodes=06065&zipCodes=06066&zipCodes=06067&zipCodes=06068&zipCodes=06069&zipCodes=06070&zipCodes=06071&zipCodes=06072&zipCodes=06073&zipCodes=06074&zipCodes=06075&zipCodes=06076&zipCodes=06077&zipCodes=06078&zipCodes=06079&zipCodes=06080&zipCodes=06081&zipCodes=06082&zipCodes=06083&zipCodes=06084&zipCodes=06085&zipCodes=06087&zipCodes=06088&zipCodes=06089&zipCodes=06090&zipCodes=06091&zipCodes=06092&zipCodes=06093&zipCodes=06094&zipCodes=06095&zipCodes=06096&zipCodes=06098&zipCodes=06101&zipCodes=06102&zipCodes=06103&zipCodes=06104&zipCodes=06105&zipCodes=06106&zipCodes=06107&zipCodes=06108&zipCodes=06109&zipCodes=06110&zipCodes=06111&zipCodes=06112&zipCodes=06114&zipCodes=06115&zipCodes=06117&zipCodes=06118&zipCodes=06119&zipCodes=06120&zipCodes=06123&zipCodes=06126&zipCodes=06127&zipCodes=06128&zipCodes=06129&zipCodes=06131

https://frontend-take-home-service.fetch.com/dogs/search?zipCodes%5B0%5D=06001&zipCodes%5B1%5D=06002&zipCodes%5B2%5D=06006&zipCodes%5B3%5D=06010&zipCodes%5B4%5D=06011&zipCodes%5B5%5D=06013&zipCodes%5B6%5D=06016&zipCodes%5B7%5D=06018&zipCodes%5B8%5D=06019&zipCodes%5B9%5D=06020&zipCodes%5B10%5D=06021&zipCodes%5B11%5D=06022&zipCodes%5B12%5D=06023&zipCodes%5B13%5D=06024&zipCodes%5B14%5D=06025&zipCodes%5B15%5D=06026&zipCodes%5B16%5D=06027&zipCodes%5B17%5D=06028&zipCodes%5B18%5D=06029&zipCodes%5B19%5D=06030&zipCodes%5B20%5D=06031&zipCodes%5B21%5D=06032&zipCodes%5B22%5D=06033&zipCodes%5B23%5D=06034&zipCodes%5B24%5D=06035&zipCodes%5B25%5D=06037&zipCodes%5B26%5D=06039&zipCodes%5B27%5D=06040&zipCodes%5B28%5D=06041&zipCodes%5B29%5D=06043&zipCodes%5B30%5D=06045&zipCodes%5B31%5D=06049&zipCodes%5B32%5D=06050&zipCodes%5B33%5D=06051&zipCodes%5B34%5D=06052&zipCodes%5B35%5D=06053&zipCodes%5B36%5D=06057&zipCodes%5B37%5D=06058&zipCodes%5B38%5D=06059&zipCodes%5B39%5D=06060&zipCodes%5B40%5D=06061&zipCodes%5B41%5D=06062&zipCodes%5B42%5D=06063&zipCodes%5B43%5D=06064&zipCodes%5B44%5D=06065&zipCodes%5B45%5D=06066&zipCodes%5B46%5D=06067&zipCodes%5B47%5D=06068&zipCodes%5B48%5D=06069&zipCodes%5B49%5D=06070&zipCodes%5B50%5D=06071&zipCodes%5B51%5D=06072&zipCodes%5B52%5D=06073&zipCodes%5B53%5D=06074&zipCodes%5B54%5D=06075&zipCodes%5B55%5D=06076&zipCodes%5B56%5D=06077&zipCodes%5B57%5D=06078&zipCodes%5B58%5D=06079&zipCodes%5B59%5D=06080&zipCodes%5B60%5D=06081&zipCodes%5B61%5D=06082&zipCodes%5B62%5D=06083&zipCodes%5B63%5D=06084&zipCodes%5B64%5D=06085&zipCodes%5B65%5D=06087&zipCodes%5B66%5D=06088&zipCodes%5B67%5D=06089&zipCodes%5B68%5D=06090&zipCodes%5B69%5D=06091&zipCodes%5B70%5D=06092&zipCodes%5B71%5D=06093&zipCodes%5B72%5D=06094&zipCodes%5B73%5D=06095&zipCodes%5B74%5D=06096&zipCodes%5B75%5D=06098&zipCodes%5B76%5D=06101&zipCodes%5B77%5D=06102&zipCodes%5B78%5D=06103&zipCodes%5B79%5D=06104&zipCodes%5B80%5D=06105&zipCodes%5B81%5D=06106&zipCodes%5B82%5D=06107&zipCodes%5B83%5D=06108&zipCodes%5B84%5D=06109&zipCodes%5B85%5D=06110&zipCodes%5B86%5D=06111&zipCodes%5B87%5D=06112&zipCodes%5B88%5D=06114&zipCodes%5B89%5D=06115&zipCodes%5B90%5D=06117&zipCodes%5B91%5D=06118&zipCodes%5B92%5D=06119&zipCodes%5B93%5D=06120&zipCodes%5B94%5D=06123&zipCodes%5B95%5D=06126&zipCodes%5B96%5D=06127&zipCodes%5B97%5D=06128&zipCodes%5B98%5D=06129&zipCodes%5B99%5D=06131&size=25&from=25

*/
