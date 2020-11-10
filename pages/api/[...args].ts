import { createProxyMiddleware } from 'http-proxy-middleware';

import { API_URL } from '@/api/config';

export const config = {
  api: {
    bodyParser: false
  }
};

export default createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    '/api': ''
  },
  logLevel: process.env.NODE_ENV === 'production' ? 'silent' : 'debug'
});
