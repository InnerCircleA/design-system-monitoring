# Design System Enhancing

> Repository 이름은 변경될 수 있음.

디자인 시스템 워크플로우를 개선하기 위한 여러 도구 혹은 프로젝트들을 모아놓은 mono-repo입니다. 해당 repo는 [NX 가이드](https://nx.dev/getting-started/package-based-repo-tutorial)을 통해 가장 익숙하고 간단한 방식인 *packaged-based*로 구성했습니다.

각자 팀원분들이 간단히 프로젝트 구조를 파악하고 각가의 프로토타입을 시험하고 구현할 수 있게 구조를 만들어놨습니다.

```text
|-- nx.json
|-- packages
    |-- component-tracking-plugin
    |-- sample-web-app
    |-- ui-toolkit
```

- `component-tracking-plugin`: 각 product 프로젝트들에서 컴포넌트들을 웹팩 빌드시 트레킹 하기 위한 커스텀 웹팩 플러그인입니다.

- `sample-web-app`: 테스트용 product 프로젝트로 `create-react-app`으로 만들어졌으며 webpack plugin 추가를 위해 `react-app-rewired`로 구성해놓은 프로젝트입니다.

- `ui-toolkit`: 여러 product 프로젝트에서 사용될 core component library 입니다. `storybook`, `rollup`

추후 빌드 task 등등을 구성할 예정입니다.
