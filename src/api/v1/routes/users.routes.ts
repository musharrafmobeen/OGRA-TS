import { Router } from "express";
import { createUser, userLogin } from "../controllers/users.controller";
import { authentication } from "../middlewares/auth";
import {
  userLoginValidation,
  addUserValidation,
  check,
} from "../validations/users";
import { body, validationResult } from "express-validator";
const router = Router();

router.post(
  "/signup",
  check,
  async (req, res, next) => {
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
  },
  authentication(["OGRA Technical Team", "OMCs Management"]),
  createUser
);
router.post("/login", userLoginValidation, userLogin);

export default router;
