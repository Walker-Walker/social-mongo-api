const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema); // creating a model of the above schema

module.exports = User;

// Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
