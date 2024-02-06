import { patch } from "./Patch";

export const init = (container, oldNode, newNode) => {
  container.appendChild(oldNode);
  patch(oldNode, newNode);
};
