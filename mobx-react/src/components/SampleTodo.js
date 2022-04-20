import React from 'react';
import { observer } from 'mobx-react-lite';
import todo from './store/todo';

const SampleTodo = observer(() => {
  console.log('render');
  return (
    <div>
      <button onClick={() => todo.fetchTodo()}>Fetch Todos</button>
      {todo.todos.map((t) => (
        <div className='cl' key={t.id}>
          <input
            type='checkbox'
            checked={t.completed}
            onChange={() => todo.completeTodo(t.id)}
          />
          {t.title}
          <button onClick={() => todo.removeTodo(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
});

export default SampleTodo;
