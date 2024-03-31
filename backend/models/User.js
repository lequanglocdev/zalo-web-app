const { model, Schema } = require("mongoose")

const userSchema = new Schema({
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: null,
  },
  birthday: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  verification: {
    type: Boolean,
    defautlt: false
  },
  friends: {
    type: [
      {
        _id: false,
        friendId: { type: Schema.Types.ObjectId, ref: "User" },
        status: { type: String, enum: ["pending", "accepted", "request"], default: "pending" },
      },
    ],
    default: [],
  },
},
  {
    timestamps: true
  }
)


module.exports = model("User", userSchema)