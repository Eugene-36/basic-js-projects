import React, { useState } from 'react';
import LocalStorage from './components/LocalStorage';

import ToggleComponent from './components/ToggleComponent';

export default function App() {
  return (
    <div className='App'>
      <LocalStorage />
      <ToggleComponent />
    </div>
  );
}
