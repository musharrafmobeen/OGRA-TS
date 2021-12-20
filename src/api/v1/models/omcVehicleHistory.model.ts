import mongoose from "mongoose";

const OMCVehicleHistorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    OMC: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "OMC Field Is Required"],
      ref: "OMC",
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "vehicle Field Is Required"],
      ref: "Vehicles",
    },
  },
  { timestamps: true }
);

export default mongoose.model("OMCVehicleHistory", OMCVehicleHistorySchema);
