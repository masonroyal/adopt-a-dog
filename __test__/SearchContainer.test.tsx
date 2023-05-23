import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchContainer from '@/components/SearchContainer/SearchContainer';
import UserProvider from '@/providers/UserProvider';
import { API_ENDPOINT } from '@/utils/constants';

const breeds = ['Pug', 'Beagle'];
const user = { name: 'test', email: 'test@test.com' };
const isLoggedIn = true;

test('renders without crashing', () => {
  render(<SearchContainer breeds={breeds} />);
});

test('renders SearchForm with correct props', () => {});

test('redirects to /login if user is not logged in', () => {});

test('calls the API with the correct parameters', () => {});

test('renders SearchResults with correct props', () => {});
