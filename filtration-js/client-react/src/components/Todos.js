import React, { useState } from 'react';
import { useArray } from '../components/useHooks/useArray';

export const Todos = () => {
  const [string, setString] = useState('');
  const todos = useArray([]);
  const [isTyping, setIsTyping] = useState(false);

  console.log('todos', todos.value);

  const helper = () => {
    if (!isTyping) {
      return <h1>{string}</h1>;
    } else {
      return;
    }
  };

  return (
    <section>
      {helper()}
      <input
        type='text'
        value={string}
        onChange={(event) => {
          setIsTyping(true);
          setString(event.target.value);
        }}
      />
      <button
        onClick={() => {
          todos.add(string);
          setString('');
          setIsTyping(false);
        }}
      >
        Add Todo
      </button>
      <ul>
        {todos.value.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => todos.removeIndex(i)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={todos.clear}>Clear Todos</button>
    </section>
  );
};
