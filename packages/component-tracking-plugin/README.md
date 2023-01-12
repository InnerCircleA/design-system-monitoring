# React Component Tracking Webpack Plugin

> 🚧  이 플러그인을 사용하기 위해서는 17버젼 이상의 React가 필요합니다. 
> 아래 JSX 형태의 React Element 변환을 타겟으로 개발되었으면 필요시 구버젼을 지원하는 버젼을 계획중에 있습니다.
> https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
 
```jsx
// Inserted by a compiler (don't import it yourself!)
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

# How to use

1. Webpack Plugin으로 `ComponentTrackingWebpackPlugin`을 추가

```javascript
const ComponentTrackingWebpackPlugin = require('component-tracking-plugin');

module.exports = { 
    //...
    plugins: [
        new ComponentTrackingWebpackPlugin({
            libraryName: 'ui-toolkit',
        })
    ], 
} 
```

2. React Project 에서 `page()` anotation으로 페이지 모듈임을 표시 후, Tracking할 library의 컴포넌트를 JSX형태로 사용 

```jsx
import React from 'react';
import { page } from 'component-tracking-anotation';
import { Button as CustomButton } from 'ui-toolkit';

page(); // 해당 모듈은 페이지 모듈

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
```

3. 해당 프로젝트를 Webpack으로 Build할 경우, 아래와 같은 `tracking.json`의 결과를 얻을 수 있습니다.

- `tracking.json`
```json
[
    {
        "project": "sample-web-app@0.1.0",
        "path": "App.tsx",
        "updated": "2023-01-12T07:01:49.791Z",
        "components": [
            {
                "name": "Button",
                "props": {
                    "theme": "secondary",
                    "children": "TEST"
                },
                "alias": "CustomButton",
                "library": "ui-toolkit",
                "version": "0.0.0"
            },
            {
                "name": "Button",
                "props": {
                    "theme": "primary",
                    "children": "TEST"
                },
                "alias": "CustomButton",
                "library": "ui-toolkit",
                "version": "0.0.0"
            }
        ]
    }
]
```