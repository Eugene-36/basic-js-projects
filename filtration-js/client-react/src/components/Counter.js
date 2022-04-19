import React from 'react';
import { useLocalStorageState } from './useHooks/useLocalStorageState';

const Counter = () => {
  const [count, setCount] = useLocalStorageState('count', 0);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  );
};

export default Counter;
