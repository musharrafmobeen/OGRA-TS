import { userData, userLogin } from "../interfaces/users";
import { body, validationResult } from "express-validator";
import { RequestHandler } from "express";
import mongoose from "mongoose";

const addUserValidation: RequestHandler = async (req, res, next) => {
  body("userName").isLength({ min: 8, max: 15 }).not().contains(" ");
  body("password").isLength({ min: 8, max: 15 }).not().contains(" ");
  body("id").isMongoId();

  body("OMC").isMongoId();

  if (!req.body.userIFEMLocation) {
    req.body.userIFEMLocation = null;
  } else {
    body("userIFEMLocation").isMongoId();
  }

  if (!req.body.deployedDepot) {
    req.body.deployedDepot = null;
  } else {
    body("deployedDepot").isMongoId();
  }

  if (!req.body.primaryDepot) {
    req.body.primaryDepot = null;
  } else {
    body("primaryDepot").isMongoId();
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        status: "Invalid Data",
        statusCode: 400,
        errorMessage: "Data Sent is not valid",
        errors: errors.array(),
      },
      message: "Data Sent is not valid",
    });
  } else {
    next();
  }
};

const userLoginValidation: RequestHandler = async (req, res, next) => {
  body("userName").isLength({ min: 8, max: 15 }).not().contains(" ");
  body("password").isLength({ min: 8, max: 15 }).not().contains(" ");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        status: "Invalid Data",
        statusCode: 400,
        errorMessage: "Data Sent is not valid",
        errors: errors.array(),
      },
      message: "Data Sent is not valid",
    });
  } else {
    next();
  }
};

const check: RequestHandler = async (req, res, next) => {
  body("userName").isLength({ min: 8, max: 15 }).not().contains(" ");
  body("password").isLength({ min: 8, max: 15 }).not().contains(" ");
  next();
};

export { addUserValidation, userLoginValidation, check };
