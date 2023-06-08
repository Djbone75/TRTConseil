const express = require("express");
const router = express.Router();
const {
  checkLoggedIn,
  checkRecruiter,
  checkConsultant,
} = require("../middleware");
const postController = require("../controllers/posts");

router.get("/", postController.getIndex);
router.get("/posts", checkLoggedIn, postController.getPosts);
router.get(
  "/postsConsultant",
  checkConsultant,
  postController.getPostsConsultant
);
router.get(
  "/postsRecruiter/:recruiter_id",
  checkRecruiter,
  postController.getPostsRecruiter
);
router.post("/posts/:id", checkConsultant, postController.approvePost);
router.post(
  "/posts/:post_id/:user_id",
  checkConsultant,
  postController.applyPost
);
router.get("/post", checkRecruiter, postController.getPost);
router.post("/post/:id", checkRecruiter, postController.postPost);
router.post("/deletePost/:postId", checkRecruiter, postController.deletePost);

module.exports = router;
