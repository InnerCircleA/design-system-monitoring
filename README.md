# Design System Monitoring Tools

해당 프로젝트는 디자인 시스템의 파운데이션 요소을 쉽게 모니터링, 업데이트할 수 있도록 도와주는 도구들을 제작해서 디자인,개발 워크플로우를 개선하는 프로젝트입니다.

## Projects

디자인 시스템 워크플로우를 개선하기 위한 여러 도구 혹은 프로젝트들을 모아놓은 mono-repo입니다. 해당 repo는 [NX 가이드](https://nx.dev/getting-started/package-based-repo-tutorial)을 통해 가장 익숙하고 간단한 방식인 *packaged-based*로 구성했습니다.

각자 팀원분들이 간단히 프로젝트 구조를 파악하고 각가의 프로토타입을 시험하고 구현할 수 있게 구조를 만들어놨습니다.

```text
|-- nx.json
|-- packages
    |-- component-tacking-anotation
    |-- component-tracking-plugin
    |-- sample-web-app
         |-- tracking.json
    |-- sample-web
         |-- tracking.json
    |-- ui-toolkit
```

- `anotation`: project repository에서 모듈에 대한 정보를 번들러에서 전달하기 위한 Anotation 모음 패키지.(ex. `page()`)

- `component-tracking-plugin`: 각 product 프로젝트들에서 컴포넌트들을 웹팩 빌드시 트레킹 하기 위한 커스텀 웹팩 플러그인입니다.

- `sample-web-app`: `create-react-app`로 구성된 예시 프로젝트입니다. (웹팩 플러그인 추가를 위해 `react-app-rewired` 사용)

- `sample-web`: next.js 로 구성된 예시 프로젝트입니다.

- `ui-toolkit`: 여러 product 프로젝트에서 사용될 core component library 입니다. (`storybook`, `rollup` 사용)

추후 NX의 빌드 task 의존성 구성을 이용해서 각각의 프로젝트에 있는 `tracking.json` 정보를 합쳐서 ui-toolkit 스토리북에서 컴포넌트 사용 모니터링할 수 있는 도구를 마련하려합니다.

# How to build

```bash
$ cd .
$ yarn install
$ npx nx build sample-web-app // all dependency projects will be build.
```
