import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchContainer from '@/components/SearchContainer/SearchContainer';

const user = { name: 'test', email: 'test@test.com' };
const isLoggedIn = true;

test('renders without crashing', () => {
  render(<SearchContainer />);
});

test('renders SearchForm with correct props', () => {});

test('calls the API with the correct parameters', () => {});
