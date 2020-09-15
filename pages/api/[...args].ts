import { createProxyMiddleware } from 'http-proxy-middleware'

export default createProxyMiddleware({
  target: 'http://47.240.250.149:8013',
  changeOrigin: true,
  pathRewrite: {
    '/api': ''
  }
})
