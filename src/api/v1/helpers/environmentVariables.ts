const getSalt = (): string => {
  const salt =
    typeof process.env.SALT === "string" ? process.env.SALT : "encriptionSalt";
  return salt;
};

const getSecretKey = (): string => {
  const key =
    typeof process.env.JWT_KEY === "string" ? process.env.JWT_KEY : "key";
  return key;
};

export { getSalt, getSecretKey };
