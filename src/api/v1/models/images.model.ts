import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    recordID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "recordID Field Is Required"],
      ref: "dispatchs",
    },
    images: { type: [], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Images", imagesSchema);
