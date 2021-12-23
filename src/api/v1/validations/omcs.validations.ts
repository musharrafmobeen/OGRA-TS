import { body, validationResult, param } from "express-validator";
import { RequestHandler } from "express";
import { objectValidator } from "../helpers/objectValidator";

const createOMCValidation: RequestHandler = async (req, res, next) => {
  const keys = [
    "OMCType",
    "OMCShortName",
    "OMCName",
    "provinceWiseROQuota",
    "carriageContractors",
    "permissions",
  ];
  console.log("body", req.body);

  if (await objectValidator(req.body, keys)) {
    const { carriageContractors, permissions } = req.body;

    body("OMCType").isString().notEmpty().run(req);
    body("OMCShortName").isString().notEmpty().run(req);
    body("OMCName").isString().notEmpty().run(req);
    body("OMCLogo").isString().notEmpty().run(req);
    body("provinceWiseROQuota").isString().notEmpty().run(req);

    if (!req.body.hasOwnProperty("OMCLogo")) {
      req.body.OMCLogo = "";
    }

    if (permissions === "") {
      req.body.permissions = {
        pr03Dashboard: {
          createPR03: true,
          viewPR03: true,
          updatePR03: true,
          deletePR03: true,
          changeDestination: true,
        },
        pr03Form: {
          registerTankLorry: true,
          saveAndDispatchTankLorry: true,
          updatePR03: true,
        },
      };
    }

    if (carriageContractors === "") {
      req.body.carriageContractors = null;
    } else {
      body("carriageContractors").isArray().run(req);
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

const updateOMCValidation: RequestHandler = async (req, res, next) => {
  body("OMCType").isString().notEmpty().run(req);
  body("OMCShortName").isString().notEmpty().run(req);
  body("OMCName").isString().notEmpty().run(req);
  body("OMCLogo").isString().notEmpty().run(req);
  body("provinceWiseROQuota").isString().notEmpty().run(req);
  param("_id").isMongoId().run(req);

  if (req.body.carriageContractors === "") {
    req.body.carriageContractors = null;
  } else {
    body("carriageContractors").isArray().run(req);
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

const deleteOMCValidation: RequestHandler = async (req, res, next) => {
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

export { createOMCValidation, updateOMCValidation, deleteOMCValidation };
