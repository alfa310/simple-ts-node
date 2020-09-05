const path = require("path");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["**/src/services/*Service.ts"],
  moduleDirectories: ["node_modules", path.join(__dirname, "test")],
};
