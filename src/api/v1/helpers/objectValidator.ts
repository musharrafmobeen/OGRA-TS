const objectValidator = async (obj: Object, keys: string[]) => {
  for (const key in keys) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export { objectValidator };
