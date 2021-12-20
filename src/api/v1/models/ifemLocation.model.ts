import mongoose from "mongoose";

const ifemSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    district: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "district Field Is Required"],
      ref: "Districts",
    },
    ifemCode: { type: String, required: [true, "ifemCode Field Is Required"] },
    ifemLocationName: {
      type: String,
      required: [true, "ifemLocationName Field Is Required"],
    },
    isDeleted: {
      type: Boolean,
      required: [true, "isDeleted Field Is Required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("IFEM", ifemSchema);
