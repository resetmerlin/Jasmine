import { createElement } from "./CreateElement";

export function convertHTMLToCreateElement(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return convertNodeToCreateElement(doc.body.firstChild);
}

// Recursive function to convert a node to createElement syntax
function convertNodeToCreateElement(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  const tag = node.tagName.toLowerCase();
  const props = {}; // This example doesn't handle attributes/props
  const children = Array.from(node.childNodes).map(convertNodeToCreateElement);

  return createElement(tag, props, ...children);
}
