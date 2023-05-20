import 'jest-fetch-mock';

import { API_ENDPOINT } from '@/utils/constants';

describe('Login', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('use entered name and email to authenticate user', async () => {
    const mockResponse = new Response(null, {
      headers: {
        'set-cookie': 'fetch-access-token=value; HttpOnly; Path=/',
      },
    });

    fetchMock.mockResponseOnce(() => Promise.resolve(mockResponse));

    await loginUser('user name', 'user email');

    expect(fetchMock).toHaveBeenCalledWith(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ name: 'user name', email: 'user email' }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
  });
});
