import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
      type: String,
      required: [true, "userName Field Is Required"],
      unique: true,
    },
    password: { type: String, required: [true, "password Field Is Required"] },
    userType: {
      type: String,
      enum: [
        "OGRA Technical Team",
        "OGRA Senior Management",
        "OMCs Management",
        "OMCs Supply Managers",
        "Data Entry Staff",
      ],
      require: [true, "userType Field Is Required"],
    },
    OMC: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OMC",
      default: null,
    },
    userIFEMLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IFEM",
      default: null,
    },
    deployedDepot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depots",
      default: null,
    },
    primaryDepot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Depots",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
