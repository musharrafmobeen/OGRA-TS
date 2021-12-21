import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";
import { objectValidator } from "../helpers/objectValidator";

const createAllowedDepotValidation: RequestHandler = async (req, res, next) => {
  const keys = [
    "OMC",
    "product",
    "sourceDepot",
    "destinationDepot",
    "fromDate",
    "toDate",
  ];

  if (await objectValidator(req.body, keys)) {
    body("product").isString().notEmpty().run(req);
    body("fromDate").isDate().run(req);
    body("toDate").isDate().run(req);
    body("sourceDepot").isMongoId().run(req);
    body("destinationDepot").isMongoId().run(req);
    body("OMC").isMongoId().run(req);
    body("id").isMongoId().run(req);

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

const updateAllowedDepotValidation: RequestHandler = async (req, res, next) => {
  body("product").isString().not().isEmpty().run(req);
  body("fromDate").isDate().run(req);
  body("toDate").isDate().run(req);
  body("sourceDepot").isMongoId().run(req);
  body("destinationDepot").isMongoId().run(req);
  body("OMC").isMongoId().run(req);
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

const deleteAllowedDepotValidation: RequestHandler = async (req, res, next) => {
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
  createAllowedDepotValidation,
  updateAllowedDepotValidation,
  deleteAllowedDepotValidation,
};
