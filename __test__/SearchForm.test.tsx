import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '@/components/SearchForm/SearchForm';

test('renders without crashing', () => {
  const mockHandleSearch = jest.fn();

  render(
    <SearchForm
      ref={null}
      breeds={['Pug', 'Beagle']}
      chosenBreeds={[]}
      setChosenBreeds={jest.fn()}
      ageMin={''}
      setAgeMin={jest.fn()}
      ageMax={''}
      setAgeMax={jest.fn()}
      size={''}
      setSize={jest.fn()}
      sortField={''}
      setSortField={jest.fn()}
      sortDirection={''}
      setSortDirection={jest.fn()}
      handleSearch={mockHandleSearch}
      city={''}
      setCity={jest.fn()}
      states={[]}
      setStates={jest.fn()}
      map={null}
      setMap={jest.fn()}
      geo={null}
      setGeo={jest.fn()}
      searchMethod={''}
      setSearchMethod={jest.fn()}
      numResults={25}
      favoriteDogsLength={0}
      setShowFavorites={jest.fn()}
    />
  );

  const form = document.querySelector('form');
  expect(form).toBeInTheDocument();
});

test('calls setter functions when input value changes', async () => {
  const user = userEvent.setup();
  const mockSetAgeMin = jest.fn();

  render(
    <SearchForm
      ref={null}
      breeds={['Pug', 'Beagle']}
      chosenBreeds={[]}
      setChosenBreeds={jest.fn()}
      ageMin={''}
      setAgeMin={mockSetAgeMin}
      ageMax={''}
      setAgeMax={jest.fn()}
      size={''}
      setSize={jest.fn()}
      sortField={''}
      setSortField={jest.fn()}
      sortDirection={''}
      setSortDirection={jest.fn()}
      handleSearch={jest.fn()}
      city={''}
      setCity={jest.fn()}
      states={[]}
      setStates={jest.fn()}
      map={null}
      setMap={jest.fn()}
      geo={null}
      setGeo={jest.fn()}
      searchMethod={''}
      setSearchMethod={jest.fn()}
      numResults={25}
      favoriteDogsLength={0}
      setShowFavorites={jest.fn()}
    />
  );

  const ageMinInput = screen.getByRole('combobox', { name: /min age/i });
  await user.selectOptions(ageMinInput, ['5']);
  expect(mockSetAgeMin).toBeCalledTimes(1);
});

test('calls handleSearch when the form is submitted', async () => {
  const user = userEvent.setup();
  const mockHandleSearch = jest.fn();

  render(
    <SearchForm
      ref={null}
      breeds={['Pug', 'Beagle']}
      chosenBreeds={[]}
      setChosenBreeds={jest.fn()}
      ageMin={''}
      setAgeMin={jest.fn()}
      ageMax={''}
      setAgeMax={jest.fn()}
      size={''}
      setSize={jest.fn()}
      sortField={''}
      setSortField={jest.fn()}
      sortDirection={''}
      setSortDirection={jest.fn()}
      handleSearch={mockHandleSearch}
      city={''}
      setCity={jest.fn()}
      states={[]}
      setStates={jest.fn()}
      map={null}
      setMap={jest.fn()}
      geo={null}
      setGeo={jest.fn()}
      searchMethod={''}
      setSearchMethod={jest.fn()}
      numResults={25}
      favoriteDogsLength={0}
      setShowFavorites={jest.fn()}
    />
  );

  // const submitButton = getByText('Search');
  // await user.click(submitButton);

  const form = document.querySelector('form');
  fireEvent.submit(form as HTMLFormElement);

  expect(mockHandleSearch).toHaveBeenCalled();
});
