import "./chunk-3RWA6CQF.js";

// src/bootstrap.jsx
import React2 from "react";
import ReactDOM from "react-dom";

// src/App.jsx
import React from "react";
function App() {
  return /* @__PURE__ */ React.createElement("div", { className: "App" }, /* @__PURE__ */ React.createElement("header", { className: "App-header" }, /* @__PURE__ */ React.createElement("h1", null, "Hello, React MFE"), /* @__PURE__ */ React.createElement("p", null, "Congratulations! Your React External Remote app is running. \u{1F389}.")));
}
var App_default = App;

// src/bootstrap.jsx
var mount = (el) => {
  ReactDOM.render(
    /* @__PURE__ */ React2.createElement(React2.StrictMode, null, /* @__PURE__ */ React2.createElement(App_default, null)),
    el
  );
};
var devRoot = document.querySelector("#root");
if (devRoot) {
  mount(devRoot);
}
export {
  mount
};
