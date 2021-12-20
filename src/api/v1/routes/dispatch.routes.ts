import express from "express";
const router = express.Router();
import {
  addDispatch,
  getDispatches,
  updateDispatch,
  deleteDispatch,
  getReceivingDispatches,
  getPersonalDispatches,
} from "../controllers/dispatch.controller";
import { authentication } from "../middlewares/auth";

router.get(
  "/",
  authentication(["OGRA Technical Team", "OMCs Management"]),
  getDispatches
);

router.get(
  "/personaldispatches",
  authentication(["OMCs Supply Managers"]),
  getPersonalDispatches
);

router.get(
  "/receivingdispatches",
  authentication(["OMCs Supply Managers"]),
  getReceivingDispatches
);

router.post("/", authentication(["OMCs Supply Managers"]), addDispatch);
router.patch("/:_id", authentication(["OMCs Supply Managers"]), updateDispatch);
router.delete("/:_id", deleteDispatch);

export default router;
