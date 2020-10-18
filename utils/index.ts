import { AVATAR_URL } from '@/shared/constants'

export const generateAvatar = (str?: string | null) => {
  if (str) {
    return AVATAR_URL + str
  } else {
    return AVATAR_URL + 'default'
  }
}
