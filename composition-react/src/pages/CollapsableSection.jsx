import React, { useState } from 'react';

const CollapsableSection = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log('children', children);
  console.log('isCollapsed', isCollapsed);

  return (
    <div className='sidebar-section'>
      <div
        className='sidebar-section-title'
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {title}
      </div>
      {!isCollapsed && <>{children}</>}
    </div>
  );
};

export default CollapsableSection;
