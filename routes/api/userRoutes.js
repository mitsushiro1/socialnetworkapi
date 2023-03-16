const User = require("../../models/User");

const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
} = require("../../controllers/users");

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// route for adding friends
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// route for deleting friends

module.exports = router;
