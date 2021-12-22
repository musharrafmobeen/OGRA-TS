import mongoose from "mongoose";

interface depots {
  id: mongoose.Schema.Types.ObjectId;
  userRole: string;
  IFEM_Location: mongoose.Schema.Types.ObjectId;
  depotName: string;
  depotIncharge: mongoose.Schema.Types.ObjectId | string | null;
  isDeleted: boolean;
  OMC: mongoose.Schema.Types.ObjectId;
}

export { depots };
