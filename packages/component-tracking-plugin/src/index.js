const { page } = require("component-tracking-anotation");
const { getReactElementsFromStatement } = require("./ast/react-element-expression");

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

          const importIdentifierNameMap = new Map(); // Identifier vs Component Name
          parser.hooks.importSpecifier.tap(className, (statement, source, exportName, identifierName) => {
            if (this.libraryName === source) {
              importIdentifierNameMap.set(identifierName, exportName);
            }
          })

          parser.hooks.statement.tap(className, (statement) => {
            const result = getReactElementsFromStatement(statement);

            if (result.length === 0) return;

            // Restore component name
            result.forEach(item => {
              item.name = importIdentifierNameMap.get(item.name);
            })

            const currNormalModule = parser.state.module;
            if (this.componentUsingInfoMap.has(currNormalModule)) {
              const previous = this.componentUsingInfoMap.get(currNormalModule);
              this.componentUsingInfoMap.set(currNormalModule, [...previous, ...result]);
            } else {
              this.componentUsingInfoMap.set(currNormalModule, result);
            }
          });
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