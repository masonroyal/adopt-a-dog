import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchContainer from '@/components/SearchContainer/SearchContainer';

const user = { name: 'test', email: 'test@test.com' };
const isLoggedIn = true;

const mockPush = jest.fn();
// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

test('renders without crashing', () => {
  render(<SearchContainer />);
});
