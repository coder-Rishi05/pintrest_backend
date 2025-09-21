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

// router.get("/getUser", async (req, res) => {
//   try {
//     const data = await userModel.find();
//     res.send(data);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/createpost", async (req, res) => {
  const postData = await Post.create({
    postText: "lovely image",
  });
  res.send(postData)
});

module.exports = router;
