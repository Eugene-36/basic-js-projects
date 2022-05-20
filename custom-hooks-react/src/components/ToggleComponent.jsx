import React, { useState } from 'react';
import useToggle from '../custom-hooks/useToggle.js';

export default function ToggleComponent() {
  const [value, toggleValue] = useToggle(false);
  console.log('value', value);
  return (
    <div>
      <div>{`${value}`}</div>
      <button onClick={toggleValue}>Toggle</button>
      <button onClick={() => toggleValue(true)}>Make True</button>
      <button onClick={() => toggleValue(false)}>Make False</button>
    </div>
  );
}
