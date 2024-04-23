const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const userSchema = new Schema(
  {
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
      defautlt: false,
    },
    friends: {
      type: [
        {
          _id: false,
          friendId: { type: Schema.Types.ObjectId, ref: "User" },
          status: {
            type: String,
            enum: ["pending", "accepted", "request"],
            default: "pending",
          },
        },
      ],
      default: [],
    },
    socket_id: {
      type: String,
    },
    passwordChangedAt: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
  createChangePassword: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};
module.exports = model("User", userSchema);
