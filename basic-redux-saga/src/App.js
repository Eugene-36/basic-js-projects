import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {
  asyncDecrementor,
  asyncIncrementor,
  decrementorCreator,
  incrementCreator,
} from './store/countReducer';
import { fetchUsers } from './store/userReducer';

function App() {
  const count = useSelector((state) => state.counterReducer.count);
  const users = useSelector((state) => state.userReducer.users);

  const dispatch = useDispatch();

  console.log('count', count);
  console.log('user', users);

  return (
    <div className='app'>
      <div className='count'>{count}</div>
      <div className='btns'>
        <button className='btn' onClick={() => dispatch(asyncIncrementor())}>
          ИНКРЕМЕНТ++
        </button>
        <button className='btn' onClick={() => dispatch(asyncDecrementor())}>
          ДЕКРЕМЕНТ--
        </button>

        <button className='btn' onClick={() => dispatch(fetchUsers())}>
          ПОЛУЧИТЬ ВСЕХ ЮЗЕРОВ
        </button>
      </div>
      <div className='users'>
        {users.map((user) => (
          <div className='user'>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
