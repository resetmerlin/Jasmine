import { render } from "./Render";

export const patch = (oldNode, newNode) => {
  if (!newNode) return;

  const renderedNewNode = render(newNode);

  if (oldNode.isEqualNode(renderedNewNode)) return;

  if (oldNode.nodeName !== renderedNewNode.nodeName) {
    oldNode.parentNode.replaceChild(renderedNewNode, oldNode);
  }

  if (
    oldNode &&
    renderedNewNode &&
    oldNode.attributes !== renderedNewNode.attributes
  ) {
    for (const attr of renderedNewNode.attributes) {
      oldNode.setAttribute(attr.name, attr.value);
    }
  }

  if (oldNode.childNodes.length !== renderedNewNode.childNodes.length) {
    oldNode.parentNode.replaceChild(renderedNewNode, oldNode);
  } else
    for (let i = 0; i < oldNode.childNodes.length; i++) {
      patch(oldNode.childNodes[i], newNode.children[i]);
    }

  return;
};
