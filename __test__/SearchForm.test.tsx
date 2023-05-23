import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchForm from '@/components/SearchForm/SearchForm';

test('renders without crashing', () => {
  const mockHandleSearch = jest.fn();

  render(
    <SearchForm
      breeds={[]}
      chosenBreeds={[]}
      setChosenBreeds={jest.fn()}
      search=""
      setSearch={jest.fn()}
      zipCode=""
      setZipCode={jest.fn()}
      ageMin=""
      setAgeMin={jest.fn()}
      ageMax=""
      setAgeMax={jest.fn()}
      size=""
      setSize={jest.fn()}
      sortField=""
      setsortField={jest.fn()}
      handleSearch={mockHandleSearch}
    />
  );

  const form = document.querySelector('form');
  expect(form).toBeInTheDocument();
});

test('calls setter functions when input value changes', async () => {
  const user = userEvent.setup();
  const mockSetZipCode = jest.fn();
  const mockHandleSearch = jest.fn();

  const { getByPlaceholderText } = render(
    <SearchForm
      breeds={[]}
      chosenBreeds={[]}
      setChosenBreeds={jest.fn()}
      search=""
      setSearch={jest.fn()}
      zipCode=""
      setZipCode={mockSetZipCode}
      ageMin=""
      setAgeMin={jest.fn()}
      ageMax=""
      setAgeMax={jest.fn()}
      size=""
      setSize={jest.fn()}
      sortField=""
      setsortField={jest.fn()}
      handleSearch={mockHandleSearch}
    />
  );

  const zipCodeInput = screen.getByRole('textbox', { name: /zip code/i });
  await user.click(zipCodeInput);
  await user.keyboard('12345');
  expect(mockSetZipCode).toBeCalledTimes(5);
});

test('calls handleSearch when the form is submitted', async () => {
  const user = userEvent.setup();
  const mockHandleSearch = jest.fn();

  const { getByText } = render(
    <SearchForm
      breeds={[]}
      chosenBreeds={[]}
      setChosenBreeds={jest.fn()}
      search=""
      setSearch={jest.fn()}
      zipCode=""
      setZipCode={jest.fn()}
      ageMin=""
      setAgeMin={jest.fn()}
      ageMax=""
      setAgeMax={jest.fn()}
      size=""
      setSize={jest.fn()}
      sortField=""
      setsortField={jest.fn()}
      handleSearch={mockHandleSearch}
    />
  );

  // const submitButton = getByText('Search');
  // await user.click(submitButton);

  const form = document.querySelector('form');
  fireEvent.submit(form as HTMLFormElement);

  expect(mockHandleSearch).toHaveBeenCalled();
});
