import mongoose from "mongoose";

interface userData {
  id: mongoose.Schema.Types.ObjectId;
  userName: string;
  userRole: string;
  password: string;
  userType:
    | "OGRA Technical Team"
    | "OGRA Senior Management"
    | "OMCs Management"
    | "OMCs Supply Managers"
    | "Data Entry Staff";
  OMC: mongoose.Schema.Types.ObjectId;
  deployedDepot: mongoose.Schema.Types.ObjectId;
  primaryDepot: mongoose.Schema.Types.ObjectId;
  userIFEMLocation: mongoose.Schema.Types.ObjectId;
}

interface userLogin {
  userName: string;
  password: string;
}

export { userData, userLogin };
