const router = require("express").Router();
const photoManger = require("../manager/photoManager");
const { isAuth } = require("../middleware/authMiddleware");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/profile", isAuth, async (req, res) => {
  const user = req.user;
  const photos = await photoManger.getPhotosByOwner(user._id).lean();

  res.render("profile", { user, photos });
});
module.exports = router;
