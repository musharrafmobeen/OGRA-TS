import { Response } from "express";

const createdResponse = (
  res: Response,
  statusCode: number,
  createdObj: Object
) => {
  return res.status(statusCode).json({
    createdObj,
  });
};

export { createdResponse };
