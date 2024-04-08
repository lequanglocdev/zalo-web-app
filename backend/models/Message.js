const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var MessageSchema = new mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    information: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    typeMessage: {
      type: String,
      enum: ["text", "image", "video", "voice", "notify", "file"],
      required: true,
      default: "text",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Message", MessageSchema);
