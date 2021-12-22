import mongoose from "mongoose";

interface allowedDepot {
  id: mongoose.Schema.Types.ObjectId;
  userRole: string;
  OMC: mongoose.Schema.Types.ObjectId;
  product: string;
  sourceDepot: mongoose.Schema.Types.ObjectId;
  destinationDepot: mongoose.Schema.Types.ObjectId;
  fromDate: Date;
  toDate: Date;
}

export { allowedDepot };
