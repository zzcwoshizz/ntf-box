import { useLocalStorage } from 'react-use'

import { deserializer, serializer } from '@/utils/cache'

function useCache<T>(key: string, initialValue?: T) {
  return useLocalStorage<T>(key, initialValue, {
    raw: false,
    serializer,
    deserializer: (value) => deserializer<T>(value)
  })
}

export default useCache
