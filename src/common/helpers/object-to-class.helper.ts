export const assignObjectToClass = (object: any, className: any) => {
  Object.keys(object).forEach(function (key) {
    if (key in className) {
      className[key] = object[key];
    }
  });
  return className;
};
