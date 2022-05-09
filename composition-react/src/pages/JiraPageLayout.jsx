import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const JiraPageLayout = ({ children }) => {
  return (
    <div className='app'>
      <Topbar />
      <div className='main-content'>
        <Sidebar />
        <div className='page-content'>{children}</div>
      </div>
    </div>
  );
};

export default JiraPageLayout;
