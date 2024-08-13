import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const mount = (el) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    el
  );
};
const devRoot = document.querySelector("#root");
if (devRoot) {
  mount(devRoot);
}
export { mount };
