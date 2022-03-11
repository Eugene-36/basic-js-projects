import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import funnyImg from '../src/img/funny.png';
function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post('http://localhost:3001/created', {
      name,
      age,
      country,
      position,
      wage,
    })
      .then((resp) => {
        console.log('res', resp);
        console.log('success');
        setEmployeeList([
          ...employeeList,
          {
            name,
            age,
            country,
            position,
            wage,
          },
        ]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //! Get list of all users

  const getEmployess = () => {
    Axios.get('http://localhost:3001/getinfo')
      .then((resp) => {
        console.log('res getEmployess', resp);
        console.log('success');
        setEmployeeList(resp.data['results']);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  console.log('employeeList', employeeList);

  return (
    <div className='App'>
      <div className='information'>
        <label htmlFor=''>Name</label>
        <input type='text' onChange={(e) => setName(e.target.value)} />
        <label htmlFor=''>Age</label>
        <input type='number' onChange={(e) => setAge(e.target.value)} />
        <label htmlFor=''>Country</label>
        <input type='text' onChange={(e) => setCountry(e.target.value)} />
        <label htmlFor=''>Position</label>
        <input type='text' onChange={(e) => setPosition(e.target.value)} />
        <label htmlFor=''>Wage (year):</label>
        <input type='number' onChange={(e) => setWage(e.target.value)} />
        <button type='submit' onClick={addEmployee}>
          Add Employee
        </button>
      </div>
      <div className='line-brake'></div>

      <button className='getAllListBtn' onClick={getEmployess}>show Employess</button>
      <div className='employees'>
        {employeeList.map(({ name, age, country, position, id }) => {
          return (
            <ul key={id} className='employeeList'>
              <img className='imgFn' src={funnyImg} alt='funny-img' />
              <li>
                <span className='styleSpan'>Name - </span> {name}
              </li>
              <li>
                <span className='styleSpan'>Age - </span> {age}
              </li>
              <li>
                <span className='styleSpan'>Country - </span> {country}
              </li>
              <li>
                <span className='styleSpan'>Position - </span> {position}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default App;
