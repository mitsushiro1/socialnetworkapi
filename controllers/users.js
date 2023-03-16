const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().populate("friends");
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

const createUser = async (req, res) => {
  try {
    console.log(req.body);

    const userData = await User.create(req.body);

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userData = await User.findByIdAndDelete(req.params.id);

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

const addFriend = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $addToSet: {
          friends: req.params.friendId,
        },
      },
      {
        new: true,
      }
    );

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: {
          friends: req.params.friendId,
        },
      },
      {
        new: true,
      }
    );

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something wrong happened!" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  deleteFriend,
};

// module.exports = {
//   // Get all users
//   getUsers(req, res) {
//     User.find()
//       .then((users) => res.json(users))
//       .catch((err) => res.status(500).json(err));
//   },

//   // Get a single user by id with thoughts and friends populated
//   getSingleUser(req, res) {
//     User.findOne({ _id: req.params.userId })
//       .populate('thoughts')
//       .populate('friends')
//       .select('-__v')
//       .then((user) => {
//         if (!user) {
//           return res.status(404).json({ message: 'No user with that ID' });
//         }
//         res.json(user);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   // Create a new user
//   createUser(req, res) {
//     User.create(req.body)
//       .then((user) => res.json(user))
//       .catch((err) => res.status(500).json(err));
//   },

//   // Update a user by id
//   updateUser(req, res) {
//     User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
//       new: true,
//       runValidators: true,
//     })
//       .then((user) => {
//         if (!user) {
//           return res.status(404).json({ message: 'No user with that ID' });
//         }
//         res.json(user);
//       })
//       .catch((err) => res.status(500).json(err));
//   },

//   // Delete a user by id
//   deleteUser(req, res) {
//     User.findOneAndDelete({ _id: req.params.userId })
//       .then((user) => {
//         if (!user) {
//           return res.status(404).json({ message: 'No user with that ID' });
//         }
//         res.json({ message: 'User deleted!' });
//       })
//       .catch((err) => res.status(500).json(err));
//   },
// };
