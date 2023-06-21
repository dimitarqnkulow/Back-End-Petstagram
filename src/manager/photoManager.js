const Photo = require("../models/Photo");

exports.create = (photoData) => Photo.create(photoData);

exports.getAll = () => Photo.find().populate("owner").lean();

exports.getOne = (photoId) => Photo.findById(photoId);

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.update = (photoId, photoData) =>
  Photo.findByIdAndUpdate(photoId, photoData);

exports.getPhotosByOwner = (userId) => Photo.find({ owner: userId });
