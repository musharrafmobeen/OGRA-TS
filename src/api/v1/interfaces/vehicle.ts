import mongoose from "mongoose";

interface vehicle {
  id: mongoose.Schema.Types.ObjectId;
  userRole: string;
  OMC: mongoose.Schema.Types.ObjectId;
  associatedDrivers: mongoose.Schema.Types.ObjectId | string | null;
  currentlyAssignedJob: mongoose.Schema.Types.ObjectId | string | null;
  regNo: string;
  overallCap: number;
  compartNo: Array<Object>;
  isDeleted: boolean;
}

export { vehicle };
