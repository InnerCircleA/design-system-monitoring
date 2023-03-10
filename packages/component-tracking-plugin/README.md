# React Component Tracking Webpack Plugin

> ๐ง  ์ด ํ๋ฌ๊ทธ์ธ์ ์ฌ์ฉํ๊ธฐ ์ํด์๋ 17๋ฒ์ ผ ์ด์์ React๊ฐ ํ์ํฉ๋๋ค. 
> ์๋ JSX ํํ์ React Element ๋ณํ์ ํ๊ฒ์ผ๋ก ๊ฐ๋ฐ๋์์ผ๋ฉด ํ์์ ๊ตฌ๋ฒ์ ผ์ ์ง์ํ๋ ๋ฒ์ ผ์ ๊ณํ์ค์ ์์ต๋๋ค.
> https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
 
```jsx
// Inserted by a compiler (don't import it yourself!)
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

# How to use

1. Webpack Plugin์ผ๋ก `ComponentTrackingWebpackPlugin`์ ์ถ๊ฐ

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

2. React Project ์์ `page()` anotation์ผ๋ก ํ์ด์ง ๋ชจ๋์์ ํ์ ํ, Trackingํ  library์ ์ปดํฌ๋ํธ๋ฅผ JSXํํ๋ก ์ฌ์ฉ 

```jsx
import React from 'react';
import { page } from 'component-tracking-anotation';
import { Button as CustomButton } from 'ui-toolkit';

page(); // ํด๋น ๋ชจ๋์ ํ์ด์ง ๋ชจ๋

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

3. ํด๋น ํ๋ก์ ํธ๋ฅผ Webpack์ผ๋ก Buildํ  ๊ฒฝ์ฐ, ์๋์ ๊ฐ์ `tracking.json`์ ๊ฒฐ๊ณผ๋ฅผ ์ป์ ์ ์์ต๋๋ค.

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