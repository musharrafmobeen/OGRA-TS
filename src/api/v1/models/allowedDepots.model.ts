import mongoose from "mongoose";

const allowedDepotsSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    OMC: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "OMC Field Is Required"],
      ref: "OMC",
    },
    product: {
      type: String,
      required: [true, "product Field Is Required"],
    },
    sourceDepot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depots",
      required: [true, "sourceDepotField Is Required"],
    },
    destinationDepot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depots",
      required: [true, "destinationDepot Field Is Required"],
    },
    fromDate: {
      type: Date,
      required: [true, "fromDate Field Is Required"],
    },
    toDate: {
      type: Date,
      required: [true, "toDate Field Is Required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("AllowedDepots", allowedDepotsSchema);
