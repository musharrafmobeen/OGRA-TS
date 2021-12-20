import express from "express";
const router = express.Router();
import {
  addVehicle,
  getVehicles,
  getDeletedVehicles,
  getWorkingVehicles,
  updateVehicle,
  deleteVehicle,
  updateVehicleOMCHistory,
} from "../controllers/vehicles.controller";
import { authentication } from "../middlewares/auth";

router.get(
  "/",
  authentication([
    "OGRA Technical Team",
    "OMCs Management",
    "OMCs Supply Managers",
  ]),
  getVehicles
);
router.get(
  "/deleted",
  authentication([
    "OGRA Technical Team",
    "OGRA Senior Management",
    "OMCs Management",
    "OMCs Supply Managers",
    "Data Entry Staff",
  ]),
  getDeletedVehicles
);
router.get(
  "/available",
  authentication([
    "OGRA Technical Team",
    "OGRA Senior Management",
    "OMCs Management",
    "OMCs Supply Managers",
    "Data Entry Staff",
  ]),
  getWorkingVehicles
);
router.post(
  "/",
  authentication([
    "OGRA Technical Team",
    "OGRA Senior Management",
    "OMCs Management",
    "OMCs Supply Managers",
    "Data Entry Staff",
  ]),
  addVehicle
);
router.patch("/:_id", updateVehicle);
router.patch("/updateOMC/:_id", updateVehicleOMCHistory);
router.delete("/:_id", deleteVehicle);

export default router;
