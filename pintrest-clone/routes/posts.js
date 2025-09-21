const mongoose = require("mongoose");

// define the post schema

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User', // here the User is user model user which refrence i am passing here. It tell that this userId is of User models data.
  },
  likes: {
    type: Array, // save user id who liked the image.
    default: [],
  },
});


// create the post model 

const Post = mongoose.model('Post',postSchema)


module.exports = Post;