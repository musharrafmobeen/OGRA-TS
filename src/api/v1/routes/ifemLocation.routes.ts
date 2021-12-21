import express from "express";
const router = express.Router();
import {
  addIfemLocation,
  getIfemLocation,
  updateIfemLocation,
  deleteIfemLocation,
} from "../controllers/ifemLocation.controller";
import {
  createIFEMLocationValidation,
  updateIFEMLocationValidation,
  deleteIFEMLocationValidation,
} from "../validations/ifemLocation.validations";

router.get("/", getIfemLocation);
router.post("/", createIFEMLocationValidation, addIfemLocation);
router.patch("/:_id", updateIFEMLocationValidation, updateIfemLocation);
router.delete("/:_id", deleteIFEMLocationValidation, deleteIfemLocation);

export default router;
