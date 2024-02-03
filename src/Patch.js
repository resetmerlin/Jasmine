export const patch = (container, oldNode, newNode) => {
  if (!oldNode) {
    container.appendChild(render(newNode));
  }

  if (!newNode) {
    container.removeChild(render(oldNode).firstChild);
  }

  if (oldNode.type !== newNode.type) {
    container.replaceChild(render(newNode), container.firstChild);
  }

  if (typeof oldNode !== "string" && typeof newNode !== "string")
    for (const [key, value] of Object.entries(oldNode.attr)) {
      if (newNode.attr[key] !== value)
        container.replaceChild(render(newNode), container.firstChild);
    }

  if (oldNode.children)
    for (let i = 0; i < oldNode.children.length; i++) {
      patch(container.firstChild, oldNode.children[i], newNode.children[i]);
    }
};
