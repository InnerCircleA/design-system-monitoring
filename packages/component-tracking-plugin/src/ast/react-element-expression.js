const estraverse = require('estraverse');
const escodegen = require('escodegen');
/**
 * AST Expression 이 React Element를 생성하는 함수 호출인지 확인하는 Util 함수
 * @param {*} expression 검증할 AST Expression 객체
 * @returns {boolean}
 */
const checkJSXCallExpression = (expression) =>
  expression.type === 'CallExpression' &&
  expression.callee?.type === 'Identifier' &&
  (expression.callee.name === '_jsx' || expression.callee.name === '_jsxDEV'); // TODO: divide parsing for DEV mode

/**
 * React Props Expression 이 Spread Syntax로 할당됐는지 확인하는 Util 함수
 * @param {*} expression JSX 호출함수의 props argument
 * @returns
 */
const checkSpreadSyntaxProps = (expression) =>
  expression?.type === 'CallExpression' &&
  expression.callee.type === 'Identifier' &&
  expression.callee.name === '_objectSpread'; // spread syntax is converted by webpack babel

/**
 * AST 분석을 통해 React Element를 생성하는 함수 CallExpression을 모두 찾아서 호출 정보 반환
 * @param {*} ast
 * @returns
 */
function getReactComponentsFromAST(ast) {
  const result = [];

  estraverse.traverse(ast, {
    enter: function (node, parent) {
      if (!checkJSXCallExpression(node)) return;

      const jsxCallExpression = node;
      const args = jsxCallExpression.arguments;
      if (args === undefined || args.length === 0) return;

      const elementType = args[0];

      let propsArg = args[1];
      let propsObjExpression = undefined;
      let spread = false;

      // TODO: Spread Syntax를 트랜스파일러의 세팅에 따라 처리방식이 달라질 수 있으므로 처리를 해줘야합니다.
      if (checkSpreadSyntaxProps(propsArg)) {
        spread = true;
        propsObjExpression =
          propsArg.arguments.length > 2 ? propsArg.arguments[2] : undefined;
      } else {
        propsObjExpression = propsArg;
      }

      // if type is "Identifier", React Component
      // else DOM Element
      if (elementType.type !== 'Identifier') return;

      const componentName = elementType.name;
      const componentProps = {};

      if (args.length > 1) {
        for (const property of propsObjExpression.properties) {
          if (property.type !== 'Property') {
            // TODO: Spread Syntax를 트랜스파일러의 세팅에 따라 처리방식이 달라질 수 있으므로 처리를 해줘야합니다.
            if (property.type === 'SpreadElement') spread = true;
            continue;
          }
          const key = property.key.name;
          let value = undefined;

          if (property.value.type === 'Literal') {
            value = property.value.value;
          } else if (
            property.value.type === 'Identifier' ||
            property.value.type === 'ObjectExpression'
          ) {
            value = {
              type: property.value.type,
              value: escodegen.generate(property.value),
            };
          }

          componentProps[key] = value;
        }
      }

      result.push({
        name: componentName,
        props: componentProps,
        spread,
      });
    },
  });

  return result;
}

module.exports = {
  getReactComponentsFromAST,
};
