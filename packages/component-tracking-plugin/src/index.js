
const { getReactComponentsFromAST } = require("./ast/react-element-expression");
const { checkPageModuleFromStatement } = require("./ast/page-anotation-expression");
const { traverseModuleGraph } = require("./module-graph");

const path = require("path");
const fs = require("fs");

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
            // TODO: Prevent Page Alias
          })

          parser.hooks.statement.tap(className, (statement) => {
            const currentNormalModule = parser.state.module;
            if (checkPageModuleFromStatement(statement)) {
              const descriptionFile = currentNormalModule.resourceResolveData.descriptionFileData;
              const pageInfo = {
                project: `${descriptionFile.name}@${descriptionFile.version}`,
                path: path.basename(currentNormalModule.resource),
                updated: new Date().toISOString(),
                components: []
              };
              this.pageInfoMap.set(currentNormalModule, pageInfo);
            }
          });

          parser.hooks.finish.tap(className, (ast) => {
            const currentNormalModule = parser.state.module;
            const componentsOfTargetLibrary = getReactComponentsFromAST(ast)
              .filter(component => importIdentifierNameMap.has(component.name))
              .map(component => ({
                ...component,
                name: importIdentifierNameMap.get(component.name)
              }));

            if (componentsOfTargetLibrary.length > 0) {
              this.componentUsingInfoMap.set(currentNormalModule, componentsOfTargetLibrary);
            }
          })
        });
    });

    compiler.hooks.compilation.tap(className, (compilation) => {
      compilation.hooks.finishModules.tap(className, (modules) => {
        const {
          moduleGraph: { _moduleMap: moduleMap },
        } = compilation;

        for (const [pageNormalModule, pageInfo] of this.pageInfoMap) {
          traverseModuleGraph(pageNormalModule, moduleMap, (normalModule) => {
            if (this.componentUsingInfoMap.has(normalModule)) {
              const componentInfoList = this.componentUsingInfoMap.get(normalModule);
              pageInfo.components = [...pageInfo.components, ...componentInfoList]
            }
          })
        }
      });
    });

    compiler.hooks.done.tap(className, () => {
      const result = JSON.stringify(Array.from(this.pageInfoMap.values()));

      fs.writeFile("tracking.json", result, (err) => {
        if (err) console.log(err);
        else {
          console.log("Generate tracking.json\n");
        }
      });
    });
  }
}

module.exports = ComponentTrackingWebpackPlugin;