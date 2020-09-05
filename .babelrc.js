const pkg = require("./package.json");

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      "@babel/preset-typescript",
      {
        targets: {
          node: pkg.engines.node,
        },
      },
    ],
  ],
};
