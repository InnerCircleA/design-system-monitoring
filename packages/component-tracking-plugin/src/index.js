
const { getReactComponentsFromAST } = require("./ast/react-element-expression");
const { checkPageModuleFromStatement } = require("./ast/page-anotation-expression");
const { traverseModuleGraph } = require("./module-graph");

const path = require("path");
const fs = require("fs");

class ComponentTrackingWebpackPlugin {
  constructor(options = {}) {
    this.libraryName = options.libraryName ?? 'ui-toolkit'; // TODO: 더 좋은 방식을 고민해야함.

    this.usedComponentInfoMap = new Map();
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

              this.pageInfoMap.set(currentNormalModule, {
                project: `${descriptionFile.name}@${descriptionFile.version}`,
                path: path.basename(currentNormalModule.resource),
                updated: new Date().toISOString(),
                components: []
              });
            }
          });

          parser.hooks.finish.tap(className, (ast) => {
            const currentNormalModule = parser.state.module;
            const usedComponentInfos = getReactComponentsFromAST(ast)
              .filter(component => importIdentifierNameMap.has(component.name))
              .map(component => ({
                ...component,
                name: importIdentifierNameMap.get(component.name),
                alias: component.name,
                library: "", // will update after module dependency is resolved 
                version: ""
              }));

            if (usedComponentInfos.length > 0) {
              this.usedComponentInfoMap.set(currentNormalModule, usedComponentInfos);
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
          traverseModuleGraph(pageNormalModule, moduleMap, (normalModule, graphModule) => {
            if (!this.usedComponentInfoMap.has(normalModule)) return;
            const usedComponentInfoList = this.usedComponentInfoMap.get(normalModule);

            Array.from(graphModule.outgoingConnections || []).forEach((connection) => {
              usedComponentInfoList.forEach(usedComponentInfo => {
                if (usedComponentInfo.alias === connection.dependency.name
                  && connection.dependency.request === this.libraryName) {
                  // Update package.json data of component
                  const descriptionData = connection.module.resourceResolveData.descriptionFileData
                  usedComponentInfo.library = descriptionData.name;
                  usedComponentInfo.version = descriptionData.version;
                }
              })
            });

            pageInfo.components = [...pageInfo.components, ...usedComponentInfoList];
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