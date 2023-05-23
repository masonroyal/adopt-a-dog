import * as React from 'react';
import styles from './SearchLocation.module.scss';
import fetcher from '@/utils/fetcher';
import InputSelect from '../InputSelect/InputSelect';
import { API_ENDPOINT, stateAbbreviations } from '@/utils/constants';
import Input from '../Input/Input';
import InputMultiSelect from '../InputMultiSelect/InputMultiSelect';
import SearchMap from '../SearchMap/SearchMap';
import InputRadioButton from '../InputRadioButton/InputRadioButton';

function SearchLocation({
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
}) {
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
      <SearchMap map={map} setMap={setMap} geo={geo} setGeo={setGeo} />
    </div>
  );
}

export default SearchLocation;
