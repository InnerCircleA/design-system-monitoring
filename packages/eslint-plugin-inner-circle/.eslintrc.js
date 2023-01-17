"use strict";

module.exports = {
  root: true,
  extends: [],
  env: {
    es6: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
};
