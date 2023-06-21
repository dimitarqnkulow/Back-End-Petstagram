const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Name should be at leats two characters!"],
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\/[\w+\W+]+/, "Invalid URL!"],
  },
  age: {
    type: Number,
    required: true,
    minLength: [1, "Age should be at least one character!"],
    maxLength: [100, "Age should be less then one hundred character!"],
  },
  description: {
    type: String,
    required: true,
    minLength: [5, "Description should be at least five character!"],
    maxLength: [50, "Description should be less then fifty character!"],
  },
  location: {
    type: String,
    required: true,
    minLength: [5, "Location should be at least five character!"],
    maxLength: [50, "Location should be less then fifty character!"],
  },
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },
      message: { type: String, required: [true, "Comment is required"] },
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
