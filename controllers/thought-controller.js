// getAllThoughts,    
//   getThoughtById, 
//   createThought, 
//   updateThoughtById, 
//   removeThought, 
//   addReaction, 
//   removeReaction 

const { Thought, User, Reaction } = require("../models");

const { db } = require("../models/Thought");

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getThoughtById(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate('reactions')
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with that Id'})
          }
          res.json(dbThoughtData);
      })
      .catch((err) => {
          res.status(400).json(err);
      })  
  },
  createThought(req, res) {
      Thought.create(req.body)
      .then((dbThoughtData) => {
          res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  updateThoughtById(req, res) {
      Thought.findOneAndUpdate({_id:req.params.thoughtId}, {$set: req.body}, {
          runValidators: true,
          new: true
      })
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with that id'})
          }
          res.json(dbThoughtData)
      })
      .catch(err => res.status(500).json(err));
  },
  removeThought(req, res) {
      Thought.findOneAndDelete({_id:req.params.ThoughtId})
      .then(dbThoughtData => {
          if (!dbThoughtData){
              return res.status(404).json({ message: 'No Thought with that Id'})
          }
          res.json(dbThoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  addReaction(req, res) {
      Thought.findOneAndUpdate({_id:req.params.ThoughtId},{$push:{reactions:req.body}},{
          runValidators: true,
          new: true
      })
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              return res.status(404).json({ message: 'No Thought with this ID'})
          }
          res.json(dbThoughtData)
      })
      .catch(err => res.status(500).json(err));

  },
removeReaction(req, res) {
    Thought.findOneAndUpdate({_id: req.params.ThoughtId}, {$pull: {reactions:{reactionId: req.params.reactionId}}},{
        runValidators: true,
        new: true
    })
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            return res.status(404).json({ message: 'No Reaction with this ID'})
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.status(500).json(err));
}




};
