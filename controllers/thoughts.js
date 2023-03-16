const Thought = require("../models/Thought");
const User = require("../models/User");

const getAllThoughts = async (req, res) => {
    try {
      const allThoughts = await Thought.find().populate("reactions");
      res.json(allThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something wrong happened!" });
    }
  };
  
  const getThoughtById = async (req, res) => {
    try {
      const thoughtData = await Thought.findById(req.params.id);
  
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something wrong happened!" });
    }
  };
  
  const createThought = async (req, res) => {
    try {
      console.log(req.body);
  
      // create the thought
      const thoughtData = await Thought.create(req.body);
  
      // update the associated user's thoughts array with the new thought's ID
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thoughtData._id } });
  
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something wrong happened!" });
    }
  };
  
  const updateThoughtById = async (req, res) => {
    try {
      const updatedThought = await User.findOneAndUpdate(
        { _id: req.params.userId, 'thoughts._id': req.params.thoughtId },
        { $set: { 'thoughts.$': req.body } },
        { new: true, runValidators: true }
      );
  
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something wrong happened!" });
    }
  };
  
  const deleteThoughtById = async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndDelete(req.params.id);
  
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something wrong happened!" });
    }
  };
  
  const addReaction = async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          $addToSet: {
            reactions: req.params.reactionId,
          },
        },
        {
          new: true,
        }
      );
  
      // Update the corresponding user's reactions array
      await User.findByIdAndUpdate(req.body.userId, { $push: { reactions: req.params.reactionId } });
  
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something wrong happened!" });
    }
  };
  
  const deleteReaction = async (req, res) => {
    try {
      const thoughtData = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        {
          $pull: {
            reactions: req.params.reactionId,
          },
        },
        {
          new: true,
        }
      );
 
      await User.findByIdAndUpdate(req.body.userId, { $pull: { reactions: req.params.reactionId } });
  
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something wrong happened!" });
    }
  };
  
  module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction,
  };