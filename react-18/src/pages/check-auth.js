import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, redirectTo }) => {
  // const authCtx = useContext();
  // return true ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
