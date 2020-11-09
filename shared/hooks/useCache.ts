import useLocalStorage from './useLocalStorage'

function useCache<T>(key: string, initialValue?: T) {
  return useLocalStorage<T>(key, initialValue)
}

export default useCache
