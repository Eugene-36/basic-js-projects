import './App.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../src/state/index.js';

function App() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { depositMoney, withdrawMoney } = bindActionCreators(
    actionCreators,
    dispatch
  );

  console.log('state', account);
  return (
    <div className='App'>
      <h1>{account}</h1>
      <button
        onClick={() => {
          depositMoney(1000);
        }}
      >
        Deposit
      </button>
      <button onClick={() => withdrawMoney(1000)}>Withdraw</button>
    </div>
  );
}

export default App;
