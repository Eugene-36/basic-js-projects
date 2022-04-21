import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchCustomers } from './asyncAction/customers';
import { decrementCashAction, incrementCashAction } from './store/cashReducer';
import {
  addCustomerAction,
  removeCustomerAction,
} from './store/customerReducer';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  console.log('customers', customers);
  console.log('cash', cash);

  const addCash = (cash) => {
    dispatch(incrementCashAction(cash));
  };

  const getCash = (cash) => {
    dispatch(decrementCashAction(cash));
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };

    dispatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  return (
    <div className='App'>
      <div style={{ fontSize: '3rem' }}>{cash}</div>
      <div className='wrapper'>
        {/*? Кнопки связанные с пополнением счёта и снятием  */}
        <button onClick={() => addCash(Number(prompt()))}>
          Пополнить счёт
        </button>
        <button onClick={() => getCash(Number(prompt()))}>
          Снять со счёта
        </button>
        {/*? Кнопки связанные с добавлением клиента и удалением  */}
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button onClick={() => getCash(Number(prompt()))}>
          Удалить клиента
        </button>
        <button onClick={() => dispatch(fetchCustomers())}>
          Получить юзеров из базы
        </button>
      </div>

      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div
              key={customer.id}
              onClick={() => removeCustomer(customer)}
              style={{
                fontSize: '2rem',
                border: '1px solid black',
                padding: '10px',
                marginTop: 5,
              }}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: '2rem', marginTop: 20 }}>
          Клиенты отсутствуют
        </div>
      )}
    </div>
  );
}

export default App;
