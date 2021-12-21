import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";
import { objectValidator } from "../helpers/objectValidator";

const createIFEMLocationValidation: RequestHandler = async (req, res, next) => {
  const keys = ["ifemCode", "district", "ifemLocationName"];

  if (await objectValidator(req.body, keys)) {
    body("ifemCode").isString().notEmpty().run(req);
    body("ifemLocationName").isString().notEmpty().run(req);
    body("district").isMongoId().run(req);

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

const updateIFEMLocationValidation: RequestHandler = async (req, res, next) => {
  body("ifemCode").isString().notEmpty().run(req);
  body("ifemLocationName").isString().notEmpty().run(req);
  body("district").isMongoId().run(req);
  body("isDeleted").isBoolean().run(req);
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

const deleteIFEMLocationValidation: RequestHandler = async (req, res, next) => {
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
  createIFEMLocationValidation,
  updateIFEMLocationValidation,
  deleteIFEMLocationValidation,
};
