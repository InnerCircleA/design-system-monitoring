const { page } = require("component-tracking-anotation");

const PAGE_ANOTATION = page.name;

class ComponentTrackingWebpackPlugin {
  constructor(options = {}) {
    this.libraryName = options.libraryName ?? 'ui-toolkit'; // TODO: find better way

    console.log("libraryName:", this.libraryName);
    console.log("pageAnotation:", PAGE_ANOTATION);
    // TODO: 각 Compilation 과정 사이에 공유되야할 정보를 담는 곳

  }

  apply(compiler) {
    const className = this.constructor.name;

    compiler.hooks.normalModuleFactory.tap(className, (factory) => {
      factory.hooks.parser
        .for("javascript/auto")
        .tap(className, (parser, options) => {
          parser.hooks.statement.tap(className, (statement) => {
            // TODO: AST Analysis 를 통한 필요한 데이터 수집
          });
        });
    });

    compiler.hooks.compilation.tap(className, (compilation) => {
      compilation.hooks.finishModules.tap(className, (modules) => {
        const {
          moduleGraph: { _moduleMap: moduleMap },
        } = compilation;

        // TODO: 모듈간의 그래프 관계를 이용한 데이터 연결         

      });
    });

    compiler.hooks.done.tap(className, () => {
      // TODO: 수집된 정보를 외부로 추출
    });
  }
}

module.exports = ComponentTrackingWebpackPlugin;