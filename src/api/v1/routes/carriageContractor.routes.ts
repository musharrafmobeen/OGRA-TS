import express from "express";
const router = express.Router();
import {
  getCarriageContractors,
  createCarriageContractor,
  updateCarriageContractor,
  deleteCarriageContractor,
} from "../controllers/carriageContractor.controller";
// const carriageContractorControllers = require("../controllers/carriageContractor");

router.get("/", getCarriageContractors);
router.post("/", createCarriageContractor);
router.patch("/:_id", updateCarriageContractor);
router.delete("/:_id", deleteCarriageContractor);

export default router;
