import express from "express";
const router = express.Router();
import {
  createDistrict,
  getDistricts,
  updateDistrict,
  deleteDistrict,
} from "../controllers/districts.controller";

import {
  createDistrictValidation,
  updateDistrictValidation,
  deleteDistrictValidation,
} from "../validations/districts.validations";

router.get("/", getDistricts);
router.post("/", createDistrictValidation, createDistrict);
router.patch("/:_id", updateDistrictValidation, updateDistrict);
router.delete("/:_id", deleteDistrictValidation, deleteDistrict);

export default router;
