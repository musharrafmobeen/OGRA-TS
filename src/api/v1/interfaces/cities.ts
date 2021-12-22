import mongoose from "mongoose";

interface cities {
  id: mongoose.Schema.Types.ObjectId;
  userRole: string;
  district: mongoose.Schema.Types.ObjectId;
  cityName: string;
}

export { cities };
