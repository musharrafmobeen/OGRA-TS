import express from "express";
const router = express.Router();
import {
  addIfemLocation,
  getIfemLocation,
  updateIfemLocation,
  deleteIfemLocation,
} from "../controllers/ifemLocation.controller";

router.get("/", getIfemLocation);
router.post("/", addIfemLocation);
router.patch("/:_id", updateIfemLocation);
router.delete("/:_id", deleteIfemLocation);

export default router;
