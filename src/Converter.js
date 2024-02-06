import { createElement } from "./CreateElement";

// Recursive function to convert a node to createElement syntax
const convertNodeToCreateElement = (node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent.trim(); // Trim to avoid text nodes with only whitespace
  }

  const tag = node.tagName.toLowerCase();

  const props = Array.from(node.attributes).reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {});

  const children = Array.from(node.childNodes)
    .map(convertNodeToCreateElement)
    .filter((child) => child !== "");

  return createElement(tag, props, ...children);
};

export const convertHTMLToCreateElement = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return convertNodeToCreateElement(doc.body.firstChild);
};
