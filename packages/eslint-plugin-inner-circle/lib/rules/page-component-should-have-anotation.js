/**
 * @fileoverview page component should have anotation
 * @author ppamppamman
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "page component should have anotation",
      recommended: true, // Whether the rule is enabled in the plugin's recommended configuration
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    const isPageComponent = context.getFilename().match(/^.*Page.tsx$/i);
    const getIsPageFunction = (name) => {
      return !!name.match(/^.*Page$/)
    }

    return {
      // visitor functions for different types of nodes
      VariableDeclarator(node) {
        if (isPageComponent && getIsPageFunction(node.id.name)) {
          const beforeTokens = context.getSourceCode(node).getTokensBefore(node)
          const pageCandidates = beforeTokens.reduce((accumulatedCandidates, token, idx) => {
            if (token.type === 'Identifier' && token.value === 'page') {
              return [...accumulatedCandidates, idx]
            }
            return accumulatedCandidates;
          }, []);

          const validateResult = pageCandidates.some(pageIdx => {
            const isValid = beforeTokens[pageIdx + 1]?.type === 'Punctuator' && beforeTokens[pageIdx + 1].value === '(' &&
              beforeTokens[pageIdx + 2]?.type === 'Punctuator' && beforeTokens[pageIdx + 2].value === ')';
            return isValid;
          })
          if (!validateResult) {
            context.report({ node, message: "doesn't have page anotation" })
          }
        }
      },
    };
  },
};
