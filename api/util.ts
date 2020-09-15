import ifetch from 'isomorphic-fetch'

import { IResponse } from './types'

interface KeyValue<T> {
  [key: string]: T
}

type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

export interface IConfig {
  method?: MethodType
  headers?: KeyValue<string>
  params?: KeyValue<number | string | boolean>
  body?: any
  timeout?: number
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
  credentials?: 'omit' | 'same-origin' | 'include'
  mode?: 'navigate' | 'same-origin' | 'no-cors' | 'cors'
}

// 按字母顺序从小到大排序，方便后面签名
const serializeParams = (obj?: KeyValue<number | string | boolean>): string => {
  if (!obj) {
    return ''
  }
  const keys: string[] = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      keys.push(String(key))
    }
  }
  keys.sort((l, r) => (l > r ? 1 : -1))
  return keys.map((key) => key + '=' + encodeURIComponent(obj[key])).join('&')
}

const combineURL = (baseURL: string, ...restURL: any[]) => {
  return !!restURL && restURL.length > 0
    ? baseURL.replace(/\/+$/, '') + '/' + restURL.map((url) => url.replace(/^\/+/, '')).join('/')
    : baseURL
}

const checkStatus = async (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    if (response.status === 401) {
      throw await response.json()
    } else {
      throw await response.json()
    }
  }
}

const parseJSON = (response: Response) => {
  return response.json()
}

class Api {
  public baseURL = ''
  public config: IConfig = {}

  constructor(baseURL: string, config: IConfig = {}) {
    this.baseURL = baseURL
    this.config = this.combineConfig(this.config, config)
  }

  public request<T = IResponse<any>>(url: string, config: IConfig = {}): Promise<T> {
    config = this.combineConfig(this.config, config)
    config = this.wrapHeaders(config)
    config = this.warpBody(config)

    const paramStr = serializeParams(config.params)

    return new Promise((resolve, reject) => {
      let timeout = false
      const abortId = setTimeout(() => {
        timeout = true
        reject(new Error('Request timeout'))
      }, config.timeout)
      ifetch(combineURL(this.baseURL, paramStr ? url + '?' + paramStr : url), {
        body: config.body,
        cache: config.cache,
        credentials: config.credentials,
        headers: config.headers,
        method: config.method,
        mode: config.mode
      })
        .then((res: any) => {
          if (timeout) {
            reject(new Error('Request timeout'))
          }
          return res
        })
        .then(checkStatus)
        .then(parseJSON)
        .then((json: any) => {
          clearTimeout(abortId)
          resolve(json)
        })
        .catch((e: any) => {
          clearTimeout(abortId)
          reject(e)
        })
    })
  }

  public get<T>(url: string, config?: IConfig) {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  public post<T>(url: string, config?: IConfig) {
    return this.request<T>(url, { ...config, method: 'POST' })
  }

  public delete<T>(url: string, config?: IConfig) {
    return this.request<T>(url, { ...config, method: 'DELETE' })
  }

  public patch<T>(url: string, config?: IConfig) {
    return this.request<T>(url, { ...config, method: 'PATCH' })
  }

  public put<T>(url: string, config?: IConfig) {
    return this.request<T>(url, { ...config, method: 'PUT' })
  }

  private combineConfig(target: IConfig, source: IConfig): IConfig {
    return {
      method: source.method || target.method || 'GET',
      headers: {
        ...target.headers,
        ...source.headers
      },
      params: { ...target.params, ...source.params },
      body: source.body,
      timeout: source.timeout ?? target.timeout ?? 10000,
      cache: source.cache ?? target.cache ?? 'default',
      credentials: source.credentials ?? target.credentials ?? 'same-origin',
      mode: source.mode ?? target.mode ?? 'same-origin'
    }
  }

  private wrapHeaders(config: IConfig): IConfig {
    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    }
  }

  private warpBody(config: IConfig): IConfig {
    let body
    for (const key in config.headers) {
      if (key.toLocaleLowerCase() === 'content-type') {
        if (/application\/json/gi.test(config.headers[key])) {
          body = config.body ? JSON.stringify(config.body) : null
        } else if (/application\/x-www-form-urlencoded/gi.test(config.headers[key])) {
          body = config.body ? serializeParams(body) : ''
        } else {
          body = config.body || null
        }
      }
    }
    if (config.method === 'GET') {
      body = null
    }
    return {
      ...config,
      body
    }
  }
}

const baseURL = process.browser ? '' : 'http://47.240.250.149:8013'

const api = new Api(baseURL, { timeout: 30000 })

export default api
