export const createElement = (type, attr, ...children) => {
  if (!attr) attr = {};

  return { type, attr, children };
};
