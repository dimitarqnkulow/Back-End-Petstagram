const Photo = require("../models/Photo");

exports.addComment = async (photoId, user, message) => {
  const photo = await Photo.findById(photoId);
  photo.comments.push({ user, message });
  return photo.save();
};
