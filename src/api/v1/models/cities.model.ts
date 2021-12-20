import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    district: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "District Field Is Required"],
      ref: "Districts",
    },
    cityName: { type: String, required: [true, "cityName Field Is Required"] },
  },
  { timestamps: true }
);

export default mongoose.model("Cities", citySchema);
