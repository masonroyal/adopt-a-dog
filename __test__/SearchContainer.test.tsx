import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchContainer from '@/components/SearchContainer/SearchContainer';
import fetcher from '../src/utils/fetcher';
import useSWR from 'swr';

const user = { name: 'test', email: 'test@test.com' };
const isLoggedIn = true;

const mockPush = jest.fn();
// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../src/utils/fetcher');
jest.mock('swr');

test('renders without crashing', () => {
  (fetcher as jest.Mock).mockResolvedValue({
    data: [],
  });

  (useSWR as jest.Mock).mockReturnValue({
    data: [],
    error: null,
    isLoading: false,
  });
  render(<SearchContainer />);
});
