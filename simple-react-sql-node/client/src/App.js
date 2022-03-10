import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  console.log();
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
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // console.log('name', name);
  // console.log('age', age);
  // console.log('country', country);
  // console.log('position', position);
  // console.log('wage', wage);
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
    </div>
  );
}

export default App;
