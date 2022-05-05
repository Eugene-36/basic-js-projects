import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import Login from './login';

const RequireAuth = ({ children, redirectTo }) => {
  const { user, setUser } = useContext(UserContext);
  console.log('user', user);
  console.log('redirectTo', redirectTo);
  //<Login />
  return user === 'Jesse Hall' ? children : <Login />;
};

export default RequireAuth;
