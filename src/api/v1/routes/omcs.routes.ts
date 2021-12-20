import { Router } from "express";
import {
  createOMC,
  getOMCs,
  getAvailableDepots,
  updateOMC,
  deleteOMC,
} from "../controllers/omcs.controller";
import { authentication } from "../middlewares/auth";
const router = Router();

router.get("/", getOMCs);
router.get("/availabledepots", getAvailableDepots);
router.post("/", createOMC);
router.patch("/:_id", updateOMC);
router.delete("/:_id", deleteOMC);

export default router;
