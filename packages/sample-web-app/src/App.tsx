import React from 'react';
import { page } from 'component-tracking-anotation';
import { Button } from 'ui-toolkit';

page();

const App: React.FC = () => {
  return (
    <div>
      <Button>TEST</Button>
    </div>
  );
};

export default App;
