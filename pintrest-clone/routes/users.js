const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pintrestApp");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId, //this is basically  id, in mongoose the id is defined as Types.ObjectId.
      ref: "Post", // the Post here is basically my refrence to The Post model.
    },
  ],
  dp: {
    type: String, // assume the profile pic is stored as a URL or file path.
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});

userSchema.pluggin(plm);

const userModel = mongoose.model("User", userSchema); // here user means the name of the model in mongoDB.

module.exports = userModel;
