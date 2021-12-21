import express from "express";
const router = express.Router();
import {
  addDriver,
  getDrivers,
  updateDriver,
  deleteDriver,
} from "../controllers/drivers.controller";
import { authentication } from "../middlewares/auth";

import {
  createDriversValidation,
  updateDriversValidation,
  deleteDriversValidation,
} from "../validations/drivers.validations";

router.get(
  "/",
  authentication([
    "OGRA Technical Team",
    "OMCs Management",
    "OMCs Supply Managers",
  ]),
  getDrivers
);
router.post(
  "/",
  authentication(["OMCs Management"]),
  createDriversValidation,
  addDriver
);
router.patch("/:_id", updateDriversValidation, updateDriver);
router.delete("/:_id", deleteDriversValidation, deleteDriver);

export default router;
