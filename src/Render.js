export const render = (component) => {
  if (!component) return;

  if (typeof component === "string") {
    return document.createTextNode(component);
  }

  const { type, attr, children } = component;

  const $component = document.createElement(type);

  for (const [key, value] of Object.entries(attr)) {
    $component.setAttribute(key, value);
  }

  children.forEach((child) => {
    $component.appendChild(render(child));
  });

  return $component;
};
