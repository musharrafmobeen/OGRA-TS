import express from "express";
const router = express.Router();
import {
  createDistrict,
  getDistricts,
  updateDistrict,
  deleteDistrict,
} from "../controllers/districts.controller";

router.get("/", getDistricts);
router.post("/", createDistrict);
router.patch("/:_id", updateDistrict);
router.delete("/:_id", deleteDistrict);

export default router;
