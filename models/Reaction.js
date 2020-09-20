const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: function () {
      return new Types.ObjectId();
    },
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  userName: {
    type: String,
    required: "Username Required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timeStamp) => moment(timeStamp).format("MMM DD, YYYY [at] hh:mm a"),
  },

},
{
    toJSON: {
        
        getters:true
    },
    id: false
}
);

// reactionId

// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
// reactionBody

// String
// Required
// 280 character maximum
// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use moment in a getter method to format the timestamp on query
// Schema Settings

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = reactionSchema;



