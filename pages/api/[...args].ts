import { createProxyMiddleware } from 'http-proxy-middleware'

export const config = {
  api: {
    bodyParser: false
  }
}

export default createProxyMiddleware({
  target: 'http://47.240.250.149:8013',
  changeOrigin: true,
  pathRewrite: {
    '/api': ''
  },
  logLevel: process.env.NODE_ENV === 'production' ? 'silent' : 'debug'
})
