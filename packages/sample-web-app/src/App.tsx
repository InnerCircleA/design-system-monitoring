import React from 'react';
import { page } from 'component-tracking-anotation';
import { Button as CustomButton } from 'ui-toolkit';

page();

const App: React.FC = () => {
  return (
    <div>
      <CustomButton theme="primary">TEST</CustomButton>
    </div>
  );
};

export default App;
