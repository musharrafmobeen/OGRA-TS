import express from "express";
const router = express.Router();
import {
  addDepot,
  getDepots,
  updateDepot,
  deleteDepot,
} from "../controllers/depots.controller";
import { authentication } from "../middlewares/auth";

import {
  createDepotValidation,
  updateDepotValidation,
  deleteDepotValidation,
} from "../validations/depots.validations";

router.get(
  "/",
  authentication(["OMCs Management", "OGRA Technical Team"]),
  getDepots
);
router.post(
  "/",
  authentication(["OMCs Management"]),
  createDepotValidation,
  addDepot
);
router.patch("/:_id", updateDepotValidation, updateDepot);
router.delete("/:_id", deleteDepotValidation, deleteDepot);

export default router;
