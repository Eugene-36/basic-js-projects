import React from 'react';
import DevelopmentSection from './DevelopmentSection';
import Header from './Header';
import PlanningSection from './PlanningSection';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Header />
      <PlanningSection />
      <DevelopmentSection />
      other Section
    </div>
  );
};

export default Sidebar;
