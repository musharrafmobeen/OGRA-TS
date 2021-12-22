import mongoose from "mongoose";

interface dispatch {
  id: mongoose.Schema.Types.ObjectId;
  userRole: string;
  vehicle: any;
  Drivers: Object[];
  destinationDepot: mongoose.Schema.Types.ObjectId;
  OMC: mongoose.Schema.Types.ObjectId;
}

export { dispatch };
