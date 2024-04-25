const isVariableEmpty = (value) => {
  if (value == null) {
    return true;
  }

  if (typeof value === "undefined") {
    return true;
  }

  if (!value) {
    return true;
  }

  if (value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

const convertStr = (str) => {
  return str.replace(/([A-Z])/g, " $1").toUpperCase();
};

export { isVariableEmpty, convertStr };
