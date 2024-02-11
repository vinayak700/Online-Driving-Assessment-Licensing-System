import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "db_ODALS",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb Connection established!");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
