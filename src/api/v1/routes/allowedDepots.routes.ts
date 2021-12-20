import express from "express";
const router = express.Router();
import {
  getAllowedDepots,
  createAllowedDepot,
  updateAllowedDepot,
  deleteAllowedDepot,
} from "../controllers/allowedDepots.controller";
// const carriageContractorControllers = require("../controllers/carriageContractor");
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
router.post("/", createAllowedDepot);
router.patch("/:_id", updateAllowedDepot);
router.delete("/:_id", deleteAllowedDepot);

export default router;
