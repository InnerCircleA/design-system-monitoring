import React from 'react';
import { page } from 'component-tracking-anotation';
import { Button as CustomButton } from 'ui-toolkit';

page();

const App: React.FC = () => {
  const test = () => <CustomButton theme="secondary">TEST</CustomButton>;

  return (
    <div>
      <CustomButton theme="primary">TEST</CustomButton>
      {test()}
    </div>
  );
};

export default App;
