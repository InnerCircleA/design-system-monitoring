/**
 * @fileoverview demo plugin
 * @author ppamppamman
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");

// REF : https://www.developerway.com/posts/custom-eslint-rules-typescript-monorepo
const rules = requireIndex(__dirname + "/rules"); // import our rules from the typescript file
// re-export our rules so that eslint run by node can understand them
module.exports = {
  rules: rules
};



