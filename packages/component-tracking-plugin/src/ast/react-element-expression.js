
/**
 * AST Expression 이 React Element를 생성하는 함수 호출인지 확인해주는 Util 함수 
 * @param {*} expression 검증할 AST Expression 객체
 * @returns {boolean} 
 */
const isJSXCallExpression = (expression) => expression.type === "CallExpression"
    && expression.callee?.type === "Identifier"
    && expression.callee.name === "_jsx";

/**
* AST Expression에서 재귀적으로 _jsx를 호출하는 Expression을 찾아서 반환해주는 Util 함수
* @param {*} rootJSXCallExpression 탐색을 시작할 AST Expression 객체 
* @returns rootJSXCallExpression 하위의 _jsx를 callee로 가지는 CallExpression 배열
*/
const findAllJSXCallExpressions = (rootCallExpression) => {
    const result = [];

    function findJSXCallExpressions(callExpression) {
        if (isJSXCallExpression(callExpression)) {
            result.push(callExpression);
        }

        if (callExpression.arguments?.length > 1) {
            const propsObjExpression = callExpression.arguments[1];
            if (propsObjExpression.type === "ObjectExpression") {
                for (const property of propsObjExpression.properties) {
                    const expression = property.value;
                    findJSXCallExpressions(expression);
                }
            }
        }
    }

    findJSXCallExpressions(rootCallExpression);
    return result;
}

/**
 * AST 분석 중 React Element를 생성하는 함수를 수집하는 함수
 * @param {*} statement AST Statement
 * @returns {*} JSX로 호출되는 컴포넌트 정보 리스트
 */
function getReactElementsFromStatement(statement) {
    const result = [];
    let expression = undefined;

    // TODO: ReturnStatement 이외에도 많으니 찾아서 처리해줘야함.
    // 웹팩 소스의 JavascriptParser를 보고 판단 walkCallExpression가 호출되는 경우를 모두 찾아서 처리해줘야함.
    if (statement.type === "ReturnStatement" && statement.argument?.type === "CallExpression") {
        expression = statement.argument;
    }

    if (expression === undefined || !isJSXCallExpression(expression)) return [];

    const allJSXCallExpressions = findAllJSXCallExpressions(expression);
    for (const jsxCallExpression of allJSXCallExpressions) {
        const args = jsxCallExpression.arguments;
        if (args === undefined || args.length === 0) continue;

        const elementType = args[0];
        const propsObjExpression = args[1];

        // when type is "Identifier", React Component 
        if (elementType.type !== "Identifier") continue;

        const componentName = elementType.name;
        const componentProps = {};

        if (args.length > 1) {
            for (const property of propsObjExpression.properties) {
                const key = property.key.name;
                let value = undefined;

                if (key === "children") continue;
                if (property.value.type === "Literal") {
                    value = property.value.value;
                } else if (property.value.type === "Identifier") {
                    value = property.value.name; // TODO: 변수로 사용될 경우. 변수 이름만 처리할 수 있음.
                }
                componentProps[key] = value;
            }
        }

        result.push({
            name: componentName,
            props: componentProps
        })
    }

    return result;
}

module.exports = {
    getReactElementsFromStatement
}