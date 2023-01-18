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
         |-- total-tracking.json // merged all tracking.json in each projects
```

- `anotation`: project repository에서 모듈에 대한 정보를 번들러에서 전달하기 위한 Anotation 모음 패키지.(ex. `page()`)

- `component-tracking-plugin`: 각 product 프로젝트들에서 컴포넌트들을 웹팩 빌드시 트레킹 하기 위한 커스텀 웹팩 플러그인입니다.

- `sample-web-app`: `create-react-app`로 구성된 예시 프로젝트입니다. (웹팩 플러그인 추가를 위해 `react-app-rewired` 사용)

- `sample-web`: next.js 로 구성된 예시 프로젝트입니다.

- `ui-toolkit`: 여러 product 프로젝트에서 사용될 core component library 입니다. (`storybook`, `rollup` 사용)

추후 NX의 빌드 task 의존성 구성을 이용해서 각각의 프로젝트에 있는 `tracking.json` 정보를 합쳐서 ui-toolkit 스토리북에서 컴포넌트 사용 모니터링할 수 있는 도구를 마련하려합니다.

# How to build

NX Command를 root `package.json`에 전체 프로젝트의 빌드를 위해 몇가지 스크립트를 활용하면 쉽게 빌드하실 수 있습니다. 

## `yarn build`

- 전체 package들의 `build`를 실행해서 모든 프러덕트 프로젝트들의 webpack 번들링을 수행합니다. 

[컴포넌트 정보를 추출하는 웹팩 플러그인](https://github.com/InnerCircleA/design-system-monitoring/tree/main/packages/component-tracking-plugin)을 이용해서 컴포넌트 사용정보(`tracking.json`)가 각각의 프로젝트 경로에 생성됩니다.

그리고 빌드 후 실행될 `postbuild` 스크립트는 `ui-toolkit` 패키지에 위 과정에서 생성된 `tracking.json`들을 합친 하나의 `total-tracking.json`이 생성됩니다.

```bash
$ cd .
$ yarn build // nx run-many --target=build
```
위 명령으로 빌드를 수행하면 프로젝트별로 사용된 컴포넌트들의 정보를 담은 파일인 `[project root]/packages/ui-toolkit/total-tracking.json`를 확인할 수 있습니다.

## `yarn storybook`

`ui-toolkit` package의 스토리북을 실행하면 프로젝트별로 사용된 컴포넌트들의 사용내역을 컴포넌트 스토리들과 함께 확인할 수 있습니다.
