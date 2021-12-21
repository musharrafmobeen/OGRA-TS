import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";
import { objectValidator } from "../helpers/objectValidator";

const createCityValidation: RequestHandler = async (req, res, next) => {
  const keys = ["cityName", "district"];

  if (await objectValidator(req.body, keys)) {
    body("cityName").isString().notEmpty().run(req);
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

const updateCityValidation: RequestHandler = async (req, res, next) => {
  body("cityName").isString().notEmpty().run(req);
  body("district").isMongoId().run(req);
  param("_id").isMongoId();

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

const deleteCityValidation: RequestHandler = async (req, res, next) => {
  param("_id").isMongoId();
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

export { createCityValidation, updateCityValidation, deleteCityValidation };
