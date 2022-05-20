import React, { useState, useEffect } from 'react';

function getValue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));
  console.log('key', key);

  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
