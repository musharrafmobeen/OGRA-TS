import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    province: {
      type: String,
      required: [true, "province Field Is Required"],
    },
    districtName: {
      type: String,
      required: [true, "districtName Field Is Required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Districts", districtSchema);
