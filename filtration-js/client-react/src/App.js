import './App.css';
import React, { useEffect, useState } from 'react';
import Counter from './components/Counter';
import { Todos } from './components/Todos.js';

const App = () => {
  return (
    <div className='App'>
      {/* <Counter /> */}
      <Todos />
    </div>
  );
};

export default App;
