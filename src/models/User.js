const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [2, "Username should be at leats two characters!"],
  },
  email: {
    type: String,
    required: true,
    minLength: [10, "Email should be at leats ten characters!"],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "Password should be at leats four characters!"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password missmatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
