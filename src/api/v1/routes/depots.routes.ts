import express from "express";
const router = express.Router();
import {
  addDepot,
  getDepots,
  updateDepot,
  deleteDepot,
} from "../controllers/depots.controller";
import { authentication } from "../middlewares/auth";

router.get(
  "/",
  authentication(["OMCs Management", "OGRA Technical Team"]),
  getDepots
);
router.post("/", authentication(["OMCs Management"]), addDepot);
router.patch("/:_id", updateDepot);
router.delete("/:_id", deleteDepot);

export default router;
