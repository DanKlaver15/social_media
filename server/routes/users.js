const express = require("express");
const router = express.Router();
const Joi = require("joi");
const userController = require("../controllers/userController");
const friendController = require("../controllers/friendController");
const feedController = require("../controllers/feedController");
const recipeController = require("../controllers/recipeController");
const auth = require("../middlewares/auth");
const { validateUser } = require("../middlewares/validate");
const avatar = require("../middlewares/avatar");

router.route("/").post(validateUser, userController.createOne);
router
  .route("/:id")
  .get(auth, userController.getOne)
  .put(auth, userController.updateOne)
  .delete(auth, userController.removeOne);

router.route("/:id/friends").get(auth, friendController.getUserFriends);
router
  .route("/:id/friendRequests")
  .get(auth, friendController.getUserFriendRequests);
router.route("/:id/person/:personId").get(auth, userController.getPerson);

router.get("/avatar/:filename", (req, res) => {
  res.type("png");
  return res.sendFile(avatar.filepath(req.params.filename));
});

router
  .route("/:id/avatar")
  .post([auth, avatar.upload, avatar.handleAvatar()], userController.addAvatar)
  .delete(auth, userController.removeAvatar);

router.route("/:id/feed").get(auth, feedController.getFeed);
router.route("/:id/recipes").get(auth, recipeController.getUserRecipes);

module.exports = router;
