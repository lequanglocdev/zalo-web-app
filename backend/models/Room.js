const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var RoomSchema = new mongoose.Schema(
  {
    users: [mongoose.Schema.Types.ObjectId],
    type: {
      type: String,
      enum: ["single", "group"],
      default: "single",
    },
    name: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Room", RoomSchema);