const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");
const { model } = require("../../models/User");


router.route("/")
.get(getAllThoughts)
.post(createThought);

router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(removeThought);

router.route("/:thoughtId/reactions")
.post(addReaction);

router.route("/:thoughtId/reactions/:reactionId")
.delete(removeReaction);


module.exports = router;
