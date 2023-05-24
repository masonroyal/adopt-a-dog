import * as React from 'react';
import styles from './SearchLocation.module.scss';
import fetcher from '@/utils/fetcher';
import InputSelect from '../InputSelect/InputSelect';
import { API_ENDPOINT, stateAbbreviations } from '@/utils/constants';
import Input from '../Input/Input';
import InputMultiSelect from '../InputMultiSelect/InputMultiSelect';
import SearchMap from '../SearchMap/SearchMap';
import InputRadioButton from '../InputRadioButton/InputRadioButton';
import dynamic from 'next/dynamic';

interface SearchLocationProps {
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
}

function SearchLocation({
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
      <br></br>
      <Input
        label="City: "
        value={city}
        setter={setCity}
        placeholder={'Enter a city'}
      />
      <br></br>
      <InputMultiSelect
        label="State(s): "
        value={states}
        setter={setStates}
        options={stateAbbreviations}
      />
      <SearchMapWithNoSSR setGeo={setGeo} />
    </div>
  );
}

export default SearchLocation;
