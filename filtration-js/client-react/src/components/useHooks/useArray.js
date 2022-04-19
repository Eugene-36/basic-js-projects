import { useCallback, useState } from 'react';

export const useArray = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    add: useCallback((a) => setValue((v) => [...v, a])),
    clear: useCallback(() => setValue(() => [])),
    removeById: useCallback((id) =>
      setValue((arr) => arr.filter((v) => v && v.id !== id))
    ),
    removeIndex: useCallback((index) =>
      setValue((v) => {
        console.log('v', v);
        console.log('index', index);

        v.splice(index, 1);
        return v;
      })
    ),
  };
};
