import express from "express";
const router = express.Router();
import {
  createCity,
  getCities,
  updateCity,
  deleteCity,
} from "../controllers/cities.controller";

import {
  createCityValidation,
  updateCityValidation,
  deleteCityValidation,
} from "../validations/cities.validations";

router.get("/", getCities);
router.post("/", createCityValidation, createCity);
router.patch("/:_id", updateCityValidation, updateCity);
router.delete("/:_id", deleteCityValidation, deleteCity);

export default router;
