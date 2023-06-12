const passport = require("passport");
const User = require("../models/user");
const Posts = require("../models/posts");
const mail = require("../mailConfig");
const path = require("path");

exports.getUser = async (req, res) => {
  let { rows } = await User.fetchInactive();

  let result = rows
    .map((row) => {
      return row;
    })
    .filter((user) => {
      return user.role == "recruiter" || user.role == "candidate";
    });

  res.render("admin/getUser", {
    user: req.user,
    users: result,
  });
};
exports.getConsultant = async (req, res) => {
  let { rows } = await User.fetchAll().catch((err) => {
    req.flash("error", err);
    res.redirect("/login");
  });

  let result = rows
    .map((row) => {
      return row;
    })
    .filter((user) => {
      return user.role == "consultant";
    });
  req.flash("success", "consultant approuvé !");

  res.render("admin/getConsultant", {
    user: req.user,
    users: result,
  });
};
exports.getPosts = async (req, res) => {
  posts = await Posts.getPosts()
    .then((result) => result.rows)
    .catch((err) => {
      req.flash("error", err);
      res.redirect("/login");
    });

  postsConsultant = await Posts.getPostsConsultant().then(
    (result) => result.rows
  );

  res.render("admin/getPosts", {
    user: req.user,
    posts: posts,
    postsConsultant: postsConsultant,
  });
};
exports.approveUser = async (req, res) => {
  userId = req.params.userId;
  await User.approveUser(userId);
  res.redirect("/admin/getUser");
};
exports.approveConsultant = async (req, res) => {
  userId = req.params.userId;
  await User.approveUser(userId);
  req.flash("success", "consultant approuvé !");
  res.redirect("/admin/getConsultant");
};
exports.approvePost = (req, res) => {
  postId = req.params.postId;
  Posts.approvePost(postId);
  req.flash("success", "post approuvé !");
  res.redirect("/admin/getPosts");
};

exports.approvePostCandidate = async (req, res) => {
  candidateId = req.params.candidateId;
  postId = req.params.postId;

  post = await Posts.findById(postId).then((result) => result.rows[0]);

  emailId = post.author_id;
  email = await User.findById(emailId).then((result) => result.rows[0].email);
  candidate = await User.findById(candidateId).then((result) => result.rows[0]);

  cv = candidate.cv || "";

  const filePath = path.join(__dirname, "../uploads", cv);

  var mailOptions = {
    from: "trtconseil@gmail.com",
    to: `"${email}"`,
    subject: "vous avez un candidat !",
    html: `'<div style="display: flex;flex-direction: column;flex-wrap: wrap;justify-content: center;align-items: center;"><div>un candidat a candidaté ;)</div><div>titre de votre annonce : ${post.rows[0].title}</div><div> candidat(e) ${candidate.lastname} ${candidate.lastname}</div><div><a href="${filePath}">telechargez le cv</a></div></div>'`,
  };

  mail.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully to", email);
    }
  });

  Posts.approvePostCandidate(candidateId, postId);
  req.flash("success", "candidature approuvée et email envoyé à " + email);
  res.redirect("/admin/getPosts");
};
