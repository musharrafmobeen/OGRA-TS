import express from "express";
const router = express.Router();
import {
  createCity,
  getCities,
  updateCity,
  deleteCity,
} from "../controllers/cities.controller";

router.get("/", getCities);
router.post("/", createCity);
router.patch("/:_id", updateCity);
router.delete("/:_id", deleteCity);

export default router;
