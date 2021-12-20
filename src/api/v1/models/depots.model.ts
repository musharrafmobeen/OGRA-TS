import mongoose from "mongoose";

const depotSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    IFEM_Location: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "IFEM_Location Field Is Required"],
      ref: "IFEM",
    },
    depotName: {
      type: String,
      required: [true, "depotName Field Is Required"],
    },
    depotIncharge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isDeleted: {
      type: Boolean,
      required: [true, "isDeleted Field Is Required"],
    },
    OMC: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OMC",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Depots", depotSchema);
