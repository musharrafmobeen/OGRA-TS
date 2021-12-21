import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";
import { objectValidator } from "../helpers/objectValidator";

const createVehicleValidation: RequestHandler = async (req, res, next) => {
  const keys = [
    "associatedDrivers",
    "regNo",
    "compartNo",
    "id",
    "currentlyAssignedJob",
  ];

  if (await objectValidator(req.body, keys)) {
    const { associatedDrivers, currentlyAssignedJob } = req.body;

    if (currentlyAssignedJob === "") {
      req.body.currentlyAssignedJob = null;
    } else {
      body("currentlyAssignedJob").isMongoId().run(req);
    }

    body("compartNo").isArray().run(req);

    if (associatedDrivers === "") {
      req.body.associatedDrivers = null;
    } else {
      body("associatedDrivers").isMongoId().run(req);
    }

    body("regNo").isString().notEmpty().run(req);
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

const updateVehicleValidation: RequestHandler = async (req, res, next) => {
  if (req.body.currentlyAssignedJob === "") {
    req.body.currentlyAssignedJob = null;
  } else {
    body("currentlyAssignedJob").isMongoId().run(req);
  }

  body("compartNo").isArray().run(req);

  if (req.body.associatedDrivers === "") {
    req.body.associatedDrivers = null;
  } else {
    body("associatedDrivers").isMongoId().run(req);
  }

  body("regNo").isString().notEmpty().run(req);
  body("id").isMongoId().run(req);

  body("isDeleted").isBoolean().run(req);
  body("OMC").isMongoId().run(req);
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

const deleteVehicleValidation: RequestHandler = async (req, res, next) => {
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
  createVehicleValidation,
  updateVehicleValidation,
  deleteVehicleValidation,
};
