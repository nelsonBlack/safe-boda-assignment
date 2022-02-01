export const assignObjectToClass = (className: any, object: any) => {
  Object.keys(className).forEach(function (key) {
    if (key in className) {
      className[key] = object[key];
    }
  });
  return className;
};
