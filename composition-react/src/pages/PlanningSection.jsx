import React from 'react';
import CollapsableSection from './CollapsableSection';

const PlanningSection = () => {
  return (
    <CollapsableSection title='Planning'>
      <button className='board-picker'>ELS board</button>

      <ul className='section-menu'>
        <li>
          <a href='#'>Roadmap</a>
        </li>
        <li>
          <a href='#'>Backlog</a>
        </li>
        <li>
          <a href='#'>Kanban board</a>
        </li>
        <li>
          <a href='#'>Reports</a>
        </li>
        <li>
          <a href='#'>Roadmap</a>
        </li>
      </ul>

      <ul className='section-menu'>
        <li>
          <a href='#'>Issues</a>
        </li>
        <li>
          <a href='#'>Components</a>
        </li>
      </ul>
    </CollapsableSection>
  );
};

export default PlanningSection;
