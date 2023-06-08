const Post = require("../models/posts");

exports.getIndex = (req, res) => {
  req.flash("success", "c'est toujours un succes");

  res.render("index", {
    user: req.user,
  });
};
exports.getPosts = async (req, res) => {
  let { rows } = await Post.getPosts();
  res.render("user/posts", { user: req.user, posts: rows });
};
exports.getPostsConsultant = async (req, res) => {
  let { rows } = await Post.getPostsConsultant();
  res.render("user/postsConsultant", { user: req.user, posts: rows });
};
exports.getPostsRecruiter = async (req, res) => {
  id = req.params.recruiter_id;
  let { rows } = await Post.getPostsById(id);
  posts = rows;
  res.render("user/postsRecruiter", { user: req.user, posts: posts });
};
exports.getPost = (req, res) => {
  res.render("user/post", { user: req.user });
};
exports.approvePost = (req, res) => {
  id = req.params.id;
  Post.approvePost(id);
  req.flash("success", "le post a été approuvé");
  res.redirect("/postsConsultant");
};
exports.applyPost = (req, res) => {
  postId = req.params.post_id;
  userId = req.params.user_id;
  Post.applyPost(postId, userId);
  req.flash("success", "la candidature a été acceptée");
  res.redirect("/posts");
};
exports.postPost = (req, res) => {
  title = req.body.title;
  city = req.body.city;
  description = req.body.description;
  userId = req.params.id;
  post = new Post(title, city, description, userId);
  post.save();
  req.flash("success", "nouvelle annonce postée avec succès");
  res.redirect("/post");
};
exports.deletePost = async (req, res) => {
  postId = req.params.postId;
  await Post.deleteById(postId);
  req.flash("success", "post supprimé !");
  res.redirect("/posts");
};
