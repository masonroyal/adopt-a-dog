import { render, screen } from '@testing-library/react';
import SearchResults from '@/components/SearchResults/SearchResults';

test('renders without crashing', () => {
  render(
    <SearchResults
      favoriteDogs={[]}
      searchResults={[]}
      handleSettingFavorites={jest.fn()}
    />
  );
});

test('renders dog cards based on provided data', () => {
  const mockDogs = [
    {
      id: 1,
      name: 'Fido',
      img: '/fido.image',
      breed: 'Labrador',
      age: 3,
      zip_code: '12345',
    },
    {
      id: 2,
      name: 'Rex',
      img: '/rex.image',
      breed: 'German Shepherd',
      age: 5,
      zip_code: '54321',
    },
  ];

  render(
    <SearchResults
      favoriteDogs={[]}
      searchResults={mockDogs}
      handleSettingFavorites={jest.fn()}
    />
  );

  const dogCards = screen.getAllByRole('article');
  expect(dogCards.length).toBe(2);
});
