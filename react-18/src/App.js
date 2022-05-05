import React, { useState, createContext, useContext } from 'react';
import { UserContext } from '../src/userContext';
import BatchingExample from './exampels/BatchingExample';
import Concurrent from './exampels/Concurrent';
//======== Route for imports
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/home-page';
import SomePage from './pages/some-page';
import DeatailPage from './pages/detail-page';
import DetailChildPage from './pages/detail-child-page';
import NotFoundPage from './pages/not-found-page';
import RequireAuth from './pages/check-auth';

function App() {
  const [user, setUser] = useState('Jesse Hasall');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className='App'>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/some' style={{ marginLeft: 10 }}>
            Some
          </Link>
        </nav>
        <hr />
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth redirectTo={'/login'}>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path='some' element={<SomePage />} />
          <Route path='/:id' element={<DeatailPage />}>
            <Route path='info' element={<DetailChildPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
        {/* <BatchingExample /> */}
        {/* <Concurrent /> */}
      </div>
    </UserContext.Provider>
  );
}

export default App;
