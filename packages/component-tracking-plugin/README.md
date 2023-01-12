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