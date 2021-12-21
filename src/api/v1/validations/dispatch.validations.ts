import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";
import { objectValidator } from "../helpers/objectValidator";

const createDispatchValidation: RequestHandler = async (req, res, next) => {
  const keys = ["id", "vehicle", "Drivers", "destinationDepot"];

  if (await objectValidator(req.body, keys)) {
    body("id").isMongoId().run(req);
    body("vehicle").isObject().run(req);
    body("destinationDepot").isObject().run(req);
    body("Drivers").isArray().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: {
          status: "Invalid Data",
          statusCode: 422,
          errorMessage: "Data Sent is not valid",
          errors: errors.array(),
        },
        message: "Data Sent is not valid",
      });
    } else {
      next();
    }
  } else {
    return res.status(422).json({
      error: {
        status: "Invalid Data",
        statusCode: 422,
        errorMessage: "Invalid Data. Fill all fields.",
      },
      message: "Invalid Data. Fill all fields.",
    });
  }
};

const updateDispatchValidation: RequestHandler = async (req, res, next) => {
  body("id").isMongoId().run(req);
  param("_id").isMongoId().run(req);
  body("vehicle").isObject().run(req);
  body("destinationDepot").isObject().run(req);
  body("Drivers").isArray().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: {
        status: "Invalid Data",
        statusCode: 422,
        errorMessage: "Data Sent is not valid",
        errors: errors.array(),
      },
      message: "Data Sent is not valid",
    });
  } else {
    next();
  }
};

const deleteDispatchValidation: RequestHandler = async (req, res, next) => {
  body("id").isMongoId().run(req);
  param("_id").isMongoId().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: {
        status: "Invalid Data",
        statusCode: 422,
        errorMessage: "Data Sent is not valid",
        errors: errors.array(),
      },
      message: "Data Sent is not valid",
    });
  } else {
    next();
  }
};

export {
  createDispatchValidation,
  updateDispatchValidation,
  deleteDispatchValidation,
};
