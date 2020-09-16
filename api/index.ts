import { IBanner, IResponse } from './types'
import api from './util'

export const getBanner = () => {
  return api.get<IResponse<IBanner[]>>('/home/banner')
}

export const subscribe = (email: string) => {
  return api.post('/email', { body: { email } })
}
