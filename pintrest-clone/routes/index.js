var express = require("express");
var router = express.Router();
const userModel = require("./users");
const Post = require("./posts");

router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async (req, res) => {
  try {
    const created_user = await userModel.create({
      userName: "rishi21",
      password: "12321",
      posts: [],
      email: "rishi3@gmail.com",
      fullName: "rishirawat",
    });
    res.send(created_user);
  } catch (err) {
    res.send(err);
  }
});

router.get("/createpost", async (req, res) => {
  const postData = await Post.create({
    postText: "lovely image",
    user: "68cf63c3c783c0bd13d11088", // now this post belongs to the user who have this id.
  });
  let user = await userModel.findOne({ _id: "68cf63c3c783c0bd13d11088" });
  user.posts.push(postData._id);
  await user.save();
  res.send("created post and connected user and posts");
});

module.exports = router;
