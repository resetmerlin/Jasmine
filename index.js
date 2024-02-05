import { createElement } from "./src/CreateElement";
import { patch } from "./src/Patch";
import { render } from "./src/Render";

let list1 = createElement(
  "ul",
  { className: "some-list" },
  createElement("li", { className: "some-list__item" }, "One"),
  createElement("li", { className: "some-list__item" }, "Two"),
  createElement("li", { className: "some-list__item" }, "Three")
);

let list2 = createElement(
  "ul",
  { className: "some-list" },
  createElement("li", { className: "some-ssss" }, "One"),
  createElement("ul", { className: "some-dd" }, "Two"),
  createElement("li", { className: "some-ddddd" }, "Three")
);

const $app = document.getElementById("app");

const init = (oldNode, newNode) => {
  $app.appendChild(oldNode);
  patch(oldNode, newNode);
};

init(render(list1), list2);
