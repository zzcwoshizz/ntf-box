export const API_URL =
  process.env.NODE_ENV === 'development'
    ? // ? 'http://47.240.250.149:8013'
      'https://finannel.com/api'
    : 'http://172.31.78.105:8013'
