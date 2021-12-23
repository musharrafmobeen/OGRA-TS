const objectValidator = async (obj: Object, keys: string[]) => {
  for (let i = 0; i < keys.length; i++) {
    if (!obj.hasOwnProperty(keys[i])) {
      return false;
    }
  }
  return true;
};

export { objectValidator };
