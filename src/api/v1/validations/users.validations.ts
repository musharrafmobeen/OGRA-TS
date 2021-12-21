import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";

const addUserValidation: RequestHandler = async (req, res, next) => {
  await body("userName")
    .isLength({ min: 8, max: 15 })
    .not()
    .contains(" ")
    .run(req);
  await body("password")
    .isLength({ min: 8, max: 15 })
    .not()
    .contains(" ")
    .run(req);

  await body("id").isMongoId().run(req);

  await body("OMC").isMongoId().run(req);

  if (!req.body.userIFEMLocation) {
    req.body.userIFEMLocation = null;
  } else {
    await body("userIFEMLocation").isMongoId().run(req);
  }

  if (!req.body.deployedDepot) {
    req.body.deployedDepot = null;
  } else {
    await body("deployedDepot").isMongoId().run(req);
  }

  if (!req.body.primaryDepot) {
    req.body.primaryDepot = null;
  } else {
    await body("primaryDepot").isMongoId().run(req);
  }

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

const userLoginValidation: RequestHandler = async (req, res, next) => {
  await body("userName")
    .isLength({ min: 8, max: 15 })
    .not()
    .contains(" ")
    .run(req);
  await body("password")
    .isLength({ min: 8, max: 15 })
    .not()
    .contains(" ")
    .run(req);
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

const updateUserValidation: RequestHandler = async (req, res, next) => {
  await body("userName")
    .isLength({ min: 8, max: 15 })
    .not()
    .contains(" ")
    .run(req);
  await body("password")
    .isLength({ min: 8, max: 15 })
    .not()
    .contains(" ")
    .run(req);

  await param("_id").isMongoId().run(req);
  await body("id").isMongoId().run(req);
  await body("OMC").isMongoId().run(req);
  await body("primaryDepot").isMongoId().run(req);
  await body("deployedDepot").isMongoId().run(req);
  await body("userIFEMLocation").isMongoId().run(req);
  await body("userRole").isString().notEmpty();

  if (req.body.hasOwnProperty("userType")) {
    delete req.body.userType;
  }

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

const deleteUserValidation: RequestHandler = async (req, res, next) => {
  await param("_id").isMongoId().run(req);
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
  addUserValidation,
  userLoginValidation,
  updateUserValidation,
  deleteUserValidation,
};
