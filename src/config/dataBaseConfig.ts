import mongoose, { ConnectOptions } from "mongoose";

const connect = async (URI: string) => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};

export default connect;
