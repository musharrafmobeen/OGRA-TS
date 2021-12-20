const throwError = async (
  status: string,
  statusCode: number,
  errorMessage: string
) => {
  const error = JSON.stringify({
    status,
    statusCode,
    errorMessage,
  });

  throw new Error(error);
};

export { throwError };
