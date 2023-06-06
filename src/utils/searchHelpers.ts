import { toast } from 'react-hot-toast';
import { API_ENDPOINT } from './constants';
import { Dog, GeoBounds } from '@/types';
import React from 'react';

export async function submitFavoriteDogs(
  favoriteDogs: Dog[],
  setMatchedDog: (dog: Dog) => void,
  setShowMatchedDog: (show: boolean) => void,
  setFavoriteDogs: (dogs: Dog[]) => void,
  setShowFavorites: (show: boolean) => void
) {
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

    setMatchedDog(data.match);
    setShowFavorites(false);
    setFavoriteDogs([]);
    setShowMatchedDog(true);

    return data;
  } catch (error) {
    toast.error('Error submitting selected dogs');
    console.error('Error submitting selected dogs: ', error);
  }
}

export function createParameters(
  chosenBreeds: string[],
  ageMin: string,
  ageMax: string,
  size: string,
  sortField: string,
  sortDirection: string
) {
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

export async function getDogsInfo(
  ids: string[],
  setSearchResults: (dogs: Dog[]) => void
) {
  try {
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
    return data;
  } catch (error) {
    toast.error('Error loading dogs. Please try again');
    console.error('Error: ', error);
  }
}

export async function getDogIds(
  searchMethod: string,
  city: string,
  states: string,
  geo: GeoBounds | null,
  chosenBreeds: string[],
  ageMin: string,
  ageMax: string,
  size: string,
  sortField: string,
  sortDirection: string,
  setPrevPage: (prev: string) => void,
  setNextPage: (next: string) => void,
  setSearchResults: (dogs: Dog[]) => void,
  setNumResults: (num: number) => void
) {
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
        states: states && searchMethod === 'City/State' ? [states] : null,
        size: 100,
        geoBoundingBox: geo && searchMethod === 'Map' ? geo : null,
      }),
    });

    if (!locationResponse.ok) {
      throw new Error(`Error in location search: ${locationResponse}`);
    }

    let zipCodes = [];

    if (city || states || (geo && searchMethod === 'Map')) {
      const locationData = await locationResponse.json();

      console.log('locationData: ', locationData);

      zipCodes = locationData.results.map(
        (location: { zip_code: string }) => location.zip_code
      );
    }

    let parameters = createParameters(
      chosenBreeds,
      ageMin,
      ageMax,
      size,
      sortField,
      sortDirection
    );

    for (let i = 0; i < zipCodes.length; i++) {
      parameters += `&zipCodes=${zipCodes[i]}`;
    }

    const response = await fetch(`${API_ENDPOINT}/dogs/search?${parameters}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error in getDogIds');
    }

    const data = await response.json();

    setPrevPage(data.prev);
    setNextPage(data.next);
    setNumResults(data.total);

    return getDogsInfo(data.resultIds, setSearchResults);
  } catch (error) {
    toast.error('Error loading dogs. Please try again');
    console.error('Error: ', error);
  }
}
