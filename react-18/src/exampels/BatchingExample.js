import React, { useState } from 'react';

// Batching позволяет оптимизировать код его перерисовку
// перересивко происходят один раз , а не каждый раз

export default function BatchingExample() {
  const [state, setState] = useState(0);
  const [value, setValue] = useState(0);

  console.log('RENDER');

  const update = () => {
    setTimeout(() => {
      setValue((prev) => prev + 1);
      setState((prev) => prev + 1);
    }, 100);
  };

  return (
    <div>
      <h1>value = {value}</h1>
      <h1>state = {state}</h1>
      <button onClick={update}>UPDATE</button>
    </div>
  );
}
