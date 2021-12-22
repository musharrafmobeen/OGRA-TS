import express from "express";
const router = express.Router();
import { addImages, getImage } from "../controllers/images.controller";

router.get("/:recordID", getImage);
router.post("/", addImages);

export default router;
