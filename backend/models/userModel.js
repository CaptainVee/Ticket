const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "You no get name?"],
  },
  email: {
    type: String,
    required: [true, "Only a cave person don't have an email"],
    unique: true,
  },
  password : {
    type: String,
    required: [true, "which kind human being ou be sef, "]
},
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User', userSchema)
