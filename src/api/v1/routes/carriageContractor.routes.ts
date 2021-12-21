import express from "express";
const router = express.Router();
import {
  getCarriageContractors,
  createCarriageContractor,
  updateCarriageContractor,
  deleteCarriageContractor,
} from "../controllers/carriageContractor.controller";

import {
  createCarriageContractorValidation,
  updateCarriageContractorValidation,
  deleteCarriageContractorValidation,
} from "../validations/carriageContractor.validations";

router.get("/", getCarriageContractors);
router.post("/", createCarriageContractorValidation, createCarriageContractor);
router.patch(
  "/:_id",
  updateCarriageContractorValidation,
  updateCarriageContractor
);
router.delete(
  "/:_id",
  deleteCarriageContractorValidation,
  deleteCarriageContractor
);

export default router;
