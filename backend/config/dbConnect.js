const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const url = process.env.MONGODB_URL
    const database = await mongoose.connect(process.env.MONGODB_URL)

    if (database.connection.readyState === 1)
      console.log("Db connection is successfully")
    else console.log("Db connecting")
  } catch (error) {
    console.log("Db connection is failed")
    console.log("error", error)
  }
};
module.exports = dbConnect
