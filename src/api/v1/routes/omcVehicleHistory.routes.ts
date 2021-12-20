import express from "express";
const router = express.Router();
import { getHistory } from "../controllers/omcVehicleHistory.controller";

router.get("/", getHistory);

export default router;
