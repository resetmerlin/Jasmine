import { createElement } from "./src/CreateElement";
import { patch } from "./src/Patch";
import { render } from "./src/Render";

let list1 = createElement(
  "ul",
  { className: "some-list" },
  createElement("li", { className: "some-list__item" }, "One"),
  createElement("li", { className: "some-list__item" }, "Two")
);

let list2 = createElement(
  "ul",
  { className: "some-list" },
  createElement("li", { className: "some-dd" }, "One"),
  createElement("li", { className: "some-list__item" }, "dd")
);

const $app = document.getElementById("app");

const init = (oldNode, newNode) => {
  $app.appendChild(render(list1));
  patch($app, oldNode, newNode);
  oldNode = newNode;
};

init(list1, list2);
