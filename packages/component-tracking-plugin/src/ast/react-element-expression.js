const estraverse = require('estraverse');
const escodegen = require('escodegen');
/**
 * AST Expression 이 React Element를 생성하는 함수 호출인지 확인해주는 Util 함수
 * @param {*} expression 검증할 AST Expression 객체
 * @returns {boolean}
 */
const checkJSXCallExpression = (expression) =>
  expression.type === 'CallExpression' &&
  expression.callee?.type === 'Identifier' &&
  expression.callee.name === '_jsx';

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
      const propsObjExpression = args[1];

      // when type is "Identifier", React Component
      if (elementType.type !== 'Identifier') return;

      const componentName = elementType.name;
      const componentProps = {};
      let spread = false;

      if (args.length > 1) {
        for (const property of propsObjExpression.properties) {
          if (property.type === 'Property') {
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
          } else if (property.type === 'SpreadElement') {
            // when use spread assign
            if (!spread) spread = true;
          }
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
