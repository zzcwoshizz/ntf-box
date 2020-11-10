import React from 'react';

import { deserializer, serializer } from '@/utils/cache';

const useCache = <T>(key: string, initialvalue?: T): [T, (value: T) => void] => {
  const [value, setValue] = React.useState<T>(initialvalue as T);

  const saveValue = React.useCallback(
    (_value: T) => {
      const v = serializer(_value);

      localStorage.setItem(key, v);
      setValue(_value);
    },
    [key]
  );

  React.useEffect(() => {
    const _value = localStorage.getItem(key);

    if (_value) {
      setValue(deserializer(_value));
    }
  }, [key]);

  return [value, saveValue];
};

export default useCache;
