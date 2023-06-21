const router = require("express").Router();
const photoManger = require("../manager/photoManager");
const Photo = require("../models/Photo");
const { getErrorMessages } = require("../utils/extractErrorMessage");
const commentsManager = require("../manager/commentsManager");
const { isAuth } = require("../middleware/authMiddleware");

//Create
router.get("/create", isAuth, (req, res) => {
  res.render("photos/create");
});

router.post("/create", isAuth, async (req, res) => {
  const photoData = req.body;
  try {
    await photoManger.create({ ...photoData, owner: req.user._id });
    res.redirect("/photos");
  } catch (error) {
    const errors = getErrorMessages(error);

    res.status(404).render("photos/create", { errors });
  }
});

//Catalogue
router.get("", async (req, res) => {
  const photos = await photoManger.getAll();

  res.render("photos/catalog", { photos });
});

//Details
router.get("/:photoId/details", async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManger
    .getOne(photoId)
    .populate("owner comments.user")
    .lean();
  const isOwner = req.user?._id == photo.owner._id;

  res.render("photos/details", { photo, isOwner });
});

//Delete
router.get("/:photoId/delete", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManger.getOne(photoId).lean();
  const isOwner = req.user?._id == photo.owner._id;

  try {
    await photoManger.delete(photoId);

    res.redirect("/photos");
  } catch (error) {
    res.status(404).render(`photos/details`, {
      errors: "Unsuccessful photo deleteion",
      isOwner,
      photo,
    });
  }
});

//Edit
router.get("/:photoId/edit", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManger.getOne(photoId).lean();
  res.render("photos/edit", { photo });
});

router.post("/:photoId/edit", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photo = req.body;
  try {
    await photoManger.update(photoId, photo);

    res.redirect(`/photos/${photoId}/details`);
  } catch (error) {
    res.status(404).render(`photos/edit`, {
      errors: "Unsuccessful photo edit",
      photo,
    });
  }
});

//Comments
router.post("/:photoId/comments", isAuth, async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManger.getOne(photoId).populate("owner").lean();
  const user = req.user._id;
  const { message } = req.body;

  try {
    await commentsManager.addComment(photoId, user, message);
    res.redirect(`/photos/${photoId}/details`);
  } catch (error) {
    const errors = getErrorMessages(error);
    res.status(404).render("photos/details", { errors, photo });
  }
});
module.exports = router;
