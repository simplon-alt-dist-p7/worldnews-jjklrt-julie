const React = require("react");

module.exports = ({ children, href }) => {
  return React.createElement("a", { href }, children);
};
