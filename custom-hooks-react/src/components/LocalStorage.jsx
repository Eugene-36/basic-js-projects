import React from 'react';
import useLocalStorage from '../custom-hooks/useLocalStorage';
import useUpdateLogger from '../custom-hooks/useUpdateLogger.js';

export default function LocalStorage() {
  const [name, setName] = useLocalStorage('name', '');

  useUpdateLogger(name);
  return (
    <div>
      {' '}
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{' '}
    </div>
  );
}
