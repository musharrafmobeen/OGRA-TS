import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    currentlyAssignedJob: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "dispatchs",
    },
    name: { type: String, required: [true, "name Field Is Required"] },
    cnic: { type: String, required: [true, "cnic Field Is Required"] },
    contact: { type: Number, required: [true, "contact Field Is Required"] },
    licenseNo: {
      type: String,
      required: [true, "licenseNo Field Is Required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "expirydate Field Is Required"],
    },
    province: {
      type: String,
      required: [true, "province Field Is Required"],
    },
    isDeleted: {
      type: Boolean,
      required: [true, "isDeleted Field Is Required"],
    },
    OMC: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "OMC Field Is Required"],
      ref: "OMC",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Drivers", driverSchema);
