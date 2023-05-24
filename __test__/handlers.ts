import { rest } from 'msw';
import { API_ENDPOINT } from '@/utils/constants';

export const handlers = [
  rest.post(`${API_ENDPOINT}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Logged in successfully' }),
      ctx.cookie('fetch-access-token', '123456789')
    );
  }),
  rest.post(`${API_ENDPOINT}/auth/logout`, (req, res, ctx) => {
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - 1);
    const expires = new Date(currentDate);
    return res(
      ctx.status(200),
      ctx.cookie('fetch-access-token', '', { expires }),
      ctx.json({ message: 'Logged out successfully' })
    );
  }),
  rest.get('*', (req, res, ctx) => {
    console.warn('No handler matched for:', req.url.toString());
    return res(
      ctx.status(500),
      ctx.json({ error: 'No handler matched for this request.' })
    );
  }),
];
