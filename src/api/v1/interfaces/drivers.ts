import mongoose from "mongoose";

interface driver {
  id: mongoose.Schema.Types.ObjectId;
  userRole: string;
  OMC: mongoose.Schema.Types.ObjectId;
  currentlyAssignedJob: mongoose.Schema.Types.ObjectId | string | null;
  name: string;
  cnic: string;
  contact: number;
  licenseNo: string;
  expiryDate: Date;
  province: string;
  isDeleted: boolean;
}

export { driver };
