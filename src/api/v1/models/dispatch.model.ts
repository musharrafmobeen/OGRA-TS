import mongoose from "mongoose";

const dispatchSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    OMC: {
      type: Object,
      required: [true, "OMC Field Is Required"],
    },
    dispatchDataEntryUserId: {
      type: Object,
      required: [true, "dispatchDataEntryUserId Field Is Required"],
    },
    recieveDataEntryUserId: {
      type: [Object],
      required: [true, "recieveDataEntryUserId Field Is Required"],
    },
    vehicle: {
      type: Object,
      required: [true, "vehicle Field Is Required"],
    },
    Drivers: {
      type: [Object],
      required: [true, "Drivers Field Is Required"],
    },
    sourceDepot: {
      type: Object,
      required: [true, "sourceDepot Field Is Required"],
    },
    destinationDepot: {
      type: Object,
      required: [true, "destinationDepot Field Is Required"],
    },
    statusByInspector: {
      type: [],
    },
    status: {
      type: String,
      enum: ["D", "A", "R"],
      required: [true, "status Field Is Required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("dispatchs", dispatchSchema);
