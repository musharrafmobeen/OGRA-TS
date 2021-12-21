import express from "express";
const router = express.Router();
import { getDashboardCounts } from "../controllers/dashBoardCounts.controller";
import { authentication } from "../middlewares/auth";

router.get(
  "/:filter",
  authentication([
    "OMCs Management",
    "OGRA Technical Team",
    "OMCs Supply Managers",
  ]),
  getDashboardCounts
);

export default router;
