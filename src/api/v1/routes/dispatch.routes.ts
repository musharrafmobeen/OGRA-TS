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
import {
  createDispatchValidation,
  updateDispatchValidation,
  deleteDispatchValidation,
} from "../validations/dispatch.validations";

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

router.post(
  "/",
  authentication(["OMCs Supply Managers"]),
  createDispatchValidation,
  addDispatch
);
router.patch(
  "/:_id",
  authentication(["OMCs Supply Managers"]),
  updateDispatchValidation,
  updateDispatch
);
router.delete("/:_id", deleteDispatchValidation, deleteDispatch);

export default router;
