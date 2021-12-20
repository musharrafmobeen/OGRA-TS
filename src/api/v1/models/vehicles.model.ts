import mongoose from "mongoose";

const vehiclesSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    associatedDrivers: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Drivers",
    },
    currentlyAssignedJob: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "dispatchs",
    },
    regNo: { type: String, required: [true, "regNo Field Is Required"] },
    overallCap: {
      type: Number,
      required: [true, "overallCap Field Is Required"],
    },
    compartNo: { type: Array, required: [true, "compartNo Field Is Required"] },
    OMC: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "OMC Field Is Required"],
      ref: "OMC",
    },
    isDeleted: {
      type: Boolean,
      required: [true, "isDeleted Field Is Required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicles", vehiclesSchema);
