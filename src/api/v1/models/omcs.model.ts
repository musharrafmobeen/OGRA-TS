import mongoose from "mongoose";

const OMCSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    OMCType: { type: String, required: [true, "OMCType Field Is Required"] },
    OMCLogo: { type: String, required: [true, "OMCLogo Field Is Required"] },
    OMCShortName: {
      type: String,
      required: [true, "OMCShortName Field Is Required"],
    },
    OMCName: { type: String, required: [true, "district Field Is Required"] },
    provinceWiseROQuota: {
      type: String,
      required: [true, "OMCName Field Is Required"],
    },
    carriageContractors: {
      type: [],
      default: null,
      ref: "carriageContractors",
    },
    permissions: {
      type: Object,
      required: [true, "permissions field is required"],
      default: {
        pr03Dashboard: {
          createPR03: false,
          viewPR03: true,
          updatePR03: false,
          deletePR03: false,
          changeDestination: false,
        },
        pr03Form: {
          registerTankLorry: false,
          saveAndDispatchTankLorry: false,
          updatePR03: false,
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("OMC", OMCSchema);
