import { useState } from 'react';

export default function useToggle(defaultValue) {
  const [value, setValue] = useState();

  function toggleValue(value) {
    setValue((currentValue) =>
      typeof value === 'boolean' ? value : !currentValue
    );
  }

  return [value, toggleValue];
}
