const { page } = require("component-tracking-anotation");
const { getReactComponentsFromAST } = require("./ast/react-element-expression");

const PAGE_ANOTATION = page.name;

class ComponentTrackingWebpackPlugin {
  constructor(options = {}) {
    this.libraryName = options.libraryName ?? 'ui-toolkit'; // TODO: find better way

    // TODO: 각 Compilation 과정 사이에 공유되야할 정보를 담는 곳
    this.componentUsingInfoMap = new Map();
    this.pageInfoMap = new Map();
  }

  apply(compiler) {
    const className = this.constructor.name;

    compiler.hooks.normalModuleFactory.tap(className, (factory) => {
      factory.hooks.parser
        .for("javascript/auto")
        .tap(className, (parser, options) => {
          const importIdentifierNameMap = new Map();

          parser.hooks.importSpecifier.tap(className, (statement, source, exportName, identifierName) => {
            if (this.libraryName === source) {
              importIdentifierNameMap.set(identifierName, exportName);
            }
          })

          parser.hooks.finish.tap(className, (ast) => {
            const componentsOfTargetLibrary = getReactComponentsFromAST(ast)
              .filter(component => importIdentifierNameMap.has(component.name))
              .map(component => ({
                ...component,
                name: importIdentifierNameMap.get(component.name)
              }));

            if (componentsOfTargetLibrary.length > 0) {
              const currNormalModule = parser.state.module;
              this.componentUsingInfoMap.set(currNormalModule, componentsOfTargetLibrary);
            }
          })
        });
    });

    compiler.hooks.compilation.tap(className, (compilation) => {
      compilation.hooks.finishModules.tap(className, (modules) => {
        const {
          moduleGraph: { _moduleMap: moduleMap },
        } = compilation;

        // TODO: 모듈간의 그래프 관계를 이용한 데이터 연결         
        for (const [normalModule, componentInfos] of this.componentUsingInfoMap) {
          console.log("Component: ", componentInfos);
        }
      });
    });

    compiler.hooks.done.tap(className, () => {
      // TODO: 수집된 정보를 외부로 추출
    });
  }
}

module.exports = ComponentTrackingWebpackPlugin;