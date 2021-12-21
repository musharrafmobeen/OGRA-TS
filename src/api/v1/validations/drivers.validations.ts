import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";
import { objectValidator } from "../helpers/objectValidator";

const createDriversValidation: RequestHandler = async (req, res, next) => {
  const keys = [
    "currentlyAssignedJob",
    "name",
    "cnic",
    "contact",
    "licenseNo",
    "expiryDate",
    "province",
    "id",
  ];

  if (await objectValidator(req.body, keys)) {
    const { currentlyAssignedJob } = req.body;

    req.body.errors = [];
    if (currentlyAssignedJob === "") {
      req.body.currentlyAssignedJob = null;
    } else {
      body("currentlyAssignedJob").isMongoId().run(req);
    }

    body("name").isString().notEmpty().run(req);
    body("lisenceNo").isString().notEmpty().run(req);
    body("province").isString().notEmpty().run(req);
    body("cnic").isString().notEmpty().isLength({ min: 15, max: 15 }).run(req);
    body("contact")
      .isString()
      .notEmpty()
      .isLength({ min: 11, max: 11 })
      .run(req);

    body("expiryDate").isDate().run(req);
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

const updateDriversValidation: RequestHandler = async (req, res, next) => {
  body("name").isString().notEmpty().run(req);
  body("lisenceNo").isString().notEmpty().run(req);
  body("province").isString().notEmpty().run(req);
  body("cnic").isString().notEmpty().isLength({ min: 15, max: 15 }).run(req);
  body("contact").isString().notEmpty().isLength({ min: 11, max: 11 }).run(req);

  body("expiryDate").isDate().run(req);
  body("id").isMongoId().run(req);
  body("isDeleted").isBoolean().run(req);
  body("OMC").isMongoId();
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

const deleteDriversValidation: RequestHandler = async (req, res, next) => {
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

export {
  createDriversValidation,
  updateDriversValidation,
  deleteDriversValidation,
};
