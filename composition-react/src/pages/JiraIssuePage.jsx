import React from 'react';
import Issue from './Issue';
import JiraPageLayout from './JiraPageLayout';

const JiraIssuePage = () => {
  return (
    <JiraPageLayout>
      <Issue />
    </JiraPageLayout>
  );
};

export default JiraIssuePage;
