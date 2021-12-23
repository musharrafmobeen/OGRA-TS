import express from "express";
const router = express.Router();
import {
  getAllowedDepots,
  createAllowedDepot,
  updateAllowedDepot,
  deleteAllowedDepot,
  getAllowedDepotsPagination,
} from "../controllers/allowedDepots.controller";

import {
  createAllowedDepotValidation,
  updateAllowedDepotValidation,
  deleteAllowedDepotValidation,
} from "../validations/allowedDepots.validations";

import { authentication } from "../middlewares/auth";

router.get(
  "/",
  authentication([
    "OGRA Technical Team",
    "OMCs Management",
    "OMCs Supply Managers",
  ]),
  getAllowedDepots
);

router.get(
  "/paginated",
  authentication([
    "OGRA Technical Team",
    "OMCs Management",
    "OMCs Supply Managers",
  ]),
  getAllowedDepotsPagination
);

router.post("/", createAllowedDepotValidation, createAllowedDepot);
router.patch("/:_id", updateAllowedDepotValidation, updateAllowedDepot);
router.delete("/:_id", deleteAllowedDepotValidation, deleteAllowedDepot);

export default router;
