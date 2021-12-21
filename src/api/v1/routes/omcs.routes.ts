import { Router } from "express";
import {
  createOMC,
  getOMCs,
  getAvailableDepots,
  updateOMC,
  deleteOMC,
} from "../controllers/omcs.controller";
import { authentication } from "../middlewares/auth";
import {
  createOMCValidation,
  updateOMCValidation,
  deleteOMCValidation,
} from "../validations/omcs.validations";

const router = Router();

router.get("/", getOMCs);
router.get("/availabledepots", getAvailableDepots);
router.post("/", createOMCValidation, createOMC);
router.patch("/:_id", updateOMCValidation, updateOMC);
router.delete("/:_id", deleteOMCValidation, deleteOMC);

export default router;
