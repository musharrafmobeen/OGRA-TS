import { Router } from "express";
import {
  createUser,
  userLogin,
  userLoginByTokenAuth,
  getUsers,
  getUsersByTimeStamps,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";
import { authentication } from "../middlewares/auth";
import {
  userLoginValidation,
  addUserValidation,
  updateUserValidation,
  deleteUserValidation,
} from "../validations/users.validations";

const router = Router();

router.post(
  "/signup",
  authentication(["OGRA Technical Team", "OMCs Management"]),
  addUserValidation,
  createUser
);
router.post("/login", userLoginValidation, userLogin);

router.get(
  "/signinbytoken",
  authentication([
    "OGRA Technical Team",
    "OGRA Senior Management",
    "OMCs Management",
    "OMCs Supply Managers",
    "Data Entry Staff",
  ]),
  userLoginByTokenAuth
);

router.get(
  "/",
  authentication(["OGRA Technical Team", "OMCs Management"]),
  getUsers
);

router.get(
  "/sorted",
  authentication([
    "OGRA Technical Team",
    "OGRA Senior Management",
    "OMCs Management",
    "OMCs Supply Managers",
    "Data Entry Staff",
  ]),
  getUsersByTimeStamps
);

router.patch(
  "/:_id",
  authentication([
    "OGRA Technical Team",
    "OGRA Senior Management",
    "OMCs Management",
    "OMCs Supply Managers",
    "Data Entry Staff",
  ]),
  updateUserValidation,
  updateUser
);

router.delete(
  "/:_id",
  authentication([
    "OGRA Technical Team",
    "OGRA Senior Management",
    "OMCs Management",
    "OMCs Supply Managers",
    "Data Entry Staff",
  ]),
  deleteUserValidation,
  deleteUser
);

export default router;
