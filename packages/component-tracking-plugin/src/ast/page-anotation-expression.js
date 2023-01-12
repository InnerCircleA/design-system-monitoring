const { page } = require("component-tracking-anotation");

function checkPageModuleFromStatement(statement) {
    return statement.type === "ExpressionStatement" &&
        statement.expression.type === "CallExpression" &&
        statement.expression.callee.type === "Identifier" &&
        statement.expression.callee.name === page.name
}

module.exports = {
    checkPageModuleFromStatement
}