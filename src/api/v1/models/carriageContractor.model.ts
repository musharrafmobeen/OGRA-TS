import mongoose from "mongoose";

const carriageContractorSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: [true, "name field Is Required"] },
  },
  { timestamps: true }
);

export default mongoose.model("carriageContractors", carriageContractorSchema);
