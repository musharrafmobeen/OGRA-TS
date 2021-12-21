import { NextFunction, Request, Response } from "express";
import { getSecretKey } from "../helpers/environmentVariables";
import userModel from "../models/users.model";
import jwt from "jsonwebtoken";

const authentication = (userTypes: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded: any = jwt.verify(token, getSecretKey());
        if (decoded) {
          if (userTypes.includes(decoded.userType)) {
            req.body.id = decoded._id;
            req.body.userRole = decoded.userType;
            const user = await userModel
              .findOne({ _id: req.body.id })
              .select("userType OMC")
              .exec();

            if (req.body["userRole"] === user.userType) {
              if (req.body.hasOwnProperty("OMC")) {
                req.body.OMC = req.body.OMC === "" ? user.OMC : req.body.OMC;
              } else {
                req.body.OMC = user.OMC;
              }
            } else {
              console.log("error");
              return res.status(401).json({
                status: 401,
                message: "User Is not authorized.",
              });
            }
            next();
          } else {
            return res.status(401).json({
              status: 401,
              message: "User Is not authorized.",
            });
          }
        }
      }
    } catch (err) {
      return res.status(401).json({
        status: 401,
        message: "User Is not authorized.",
        error: err,
      });
    }
  };
};

export { authentication };
