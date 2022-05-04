import React, { useEffect } from 'react';

import { Outlet, useNavigate, useParams } from 'react-router-dom';
const DeatailPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const isInteger = /^-?[0-9]+$/.test(id + '');

  useEffect(() => {
    if (!isInteger) {
      navigate('/');
    }
  }, []);
  console.log('id', id);
  return (
    <div>
      detail-page id: {id}
      <br />
      <Outlet />
    </div>
  );
};

export default DeatailPage;
