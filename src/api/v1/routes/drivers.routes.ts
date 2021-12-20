import express from "express";
const router = express.Router();
import {
  addDriver,
  getDrivers,
  updateDriver,
  deleteDriver,
} from "../controllers/drivers.controller";
import { authentication } from "../middlewares/auth";

router.get(
  "/",
  authentication([
    "OGRA Technical Team",
    "OMCs Management",
    "OMCs Supply Managers",
  ]),
  getDrivers
);
router.post("/", authentication(["OMCs Management"]), addDriver);
router.patch("/:_id", updateDriver);
router.delete("/:_id", deleteDriver);

export default router;
