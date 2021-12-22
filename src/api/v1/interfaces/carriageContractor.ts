import mongoose from "mongoose";

interface carriageContractor {
  id: mongoose.Schema.Types.ObjectId;
  userRole: string;
  name: string;
}

export { carriageContractor };
