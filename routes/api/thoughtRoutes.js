// route for adding reaction
const Thought = require("../../models/Thought");

const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById);

router
  .route("/:thoughtId/reactions/:reactionId")
  .post(addReaction)
  .delete(deleteReaction);

// route for deleting reaction
module.exports = router;