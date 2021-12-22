import mongoose from "mongoose";

interface ifemLocation {
  district: mongoose.Schema.Types.ObjectId;
  ifemCode: string;
  ifemLocationName: string;
  isDeleted: boolean;
}

export { ifemLocation };
