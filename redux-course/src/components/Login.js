import React from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/user';

export default function Login() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(login({ name: 'Thanos', age: 25, email: 'email@dsa.com' }));
        }}
      >
        Login
      </button>

      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}
