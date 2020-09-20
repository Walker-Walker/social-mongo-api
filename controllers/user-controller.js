const { User, Thought } = require("../models/");






//     removeFriend

const UserController = {
  getAllUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends") //left join table friends
      .populate("thoughts")
      .then((dbUserData) => {
        if (!dbUserData) {
         return res.status(404).json({ message: 'No user with that ID exists'})
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err); //bad request
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  updateUser(req, res) {
        User.findOneAndUpdate({_id:req.params.userId}, {$set:req.body}, {
            runValidators: true,
            new: true
        })
        .then(dbUserData => {
            if (!dbUserData) {
               return res.status(404).json({ message: 'No user with that Id exists'})
            }
            res.json(dbUserData)
        }) 
        .catch(err => res.status(500).json(err));
  },

  deleteUser(req, res) {
      User.findOneAndDelete({_id:req.params.userId})
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with that ID exist'})
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
       
  },
  addFriend(req, res){
      User.findOneAndUpdate({_id:req.params.userId},{$addToSet:{friends: req.params.friendId}},{
            new: true

      })
      .then(dbUserData => {
          if (!dbUserData) {
              return res.status(404).json({ message: 'No User with this Id'})
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  },

  removeFriend(req, res) {
      User.findOneAndUpdate({_id:req.params.userId},{$pull:{friends: req.params.friendId}},{
          new: true
      })
      .then(dbUserData => {
          if (!dbUserData) {
              return res.status(404).json({ message: 'No User with this Id'})
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(500).json(err));
  }


};

module.exports = UserController;