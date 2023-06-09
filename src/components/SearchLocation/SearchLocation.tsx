import * as React from 'react';
import Input from '../Input/Input';
import SearchMap from '../SearchMap/SearchMap';
import InputRadioButton from '../InputRadioButton/InputRadioButton';
import dynamic from 'next/dynamic';

import { stateAbbreviations } from '@/utils/constants';

import styles from './SearchLocation.module.scss';
import InputSelect from '../InputSelect/InputSelect';

interface SearchLocationProps {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  states: string;
  setStates: React.Dispatch<React.SetStateAction<string>>;
  setGeo: React.Dispatch<React.SetStateAction<any>>;
  searchMethod: string;
  setSearchMethod: React.Dispatch<React.SetStateAction<string>>;
}

function SearchLocation({
  city,
  setCity,
  states,
  setStates,
  setGeo,

  searchMethod,
  setSearchMethod,
}: SearchLocationProps) {
  const SearchMapWithNoSSR = dynamic(() => import('../SearchMap/SearchMap'), {
    ssr: false,
  });

  return (
    <div className={styles.wrapper}>
      <InputRadioButton
        legend="Search with: "
        options={['City/State', 'Map']}
        name="searchWith"
        value={searchMethod}
        setter={setSearchMethod}
      />
      {searchMethod === 'City/State' && (
        <div className={styles.cityStateSearch}>
          <Input
            label="City: "
            value={city}
            setter={setCity}
            placeholder={'Enter a city'}
          />
          <InputSelect
            label="State: "
            value={states}
            setter={setStates}
            options={stateAbbreviations}
          />
        </div>
      )}
      {searchMethod === 'Map' && (
        <>
          <SearchMapWithNoSSR setGeo={setGeo} />
          {/* <SearchMap setGeo={setGeo} /> */}
        </>
      )}
    </div>
  );
}

export default SearchLocation;
