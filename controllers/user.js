const User = require("../models/user");
const multer = require("multer");
const path = require("path");

const { pool } = require("../dbconfig");
const bcrypt = require("bcrypt");

const passport = require("passport");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

exports.getLogin = (req, res) => {
  res.render("user/login", { user: req.user });
};
exports.postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/user/login",
  failureFlash: false,
});

exports.getRegister = (req, res) => {
  res.render("user/register", { user: req.user });
};
exports.postRegister = async (req, res, next) => {
  const { email, password, role } = req.body;
  await User.findByEmail(email).then(async (user) => {
    if (user.rows[0] && user.rows[0].email) {
      req.flash("error", "l'utilisateur existe déjà");
      return res.redirect("/user/login");
    } else {
      let passwordHash = await bcrypt.hash(password, 12);
      await pool.query(
        `INSERT INTO "users" ("email", "password", "role")  
             VALUES ($1, $2, $3)`,
        [email, passwordHash, role]
      );

      req.flash("success", "vous vous êtes enregistré avec succès ");
      res.redirect("/user/login");
    }
  });
};
exports.postRegisterConsultant = async (req, res, next) => {
  const { email, password } = req.body;
  let passwordHash = await bcrypt.hash(password, 12);
  await pool
    .query(
      `INSERT INTO "users" ("email", "password", "role", "active")  
             VALUES ($1, $2, $3, $4)`,
      [email, passwordHash, "consultant", true]
    )
    .catch((err) => {
      req.flash("error", err);
      res.redirect("/login");
    });
  req.flash("success", "consultant enregistré");
  res.redirect("/admin/getconsultant");
};
exports.getUser = (req, res) => {
  const filePath = path.join(__dirname, "../uploads");

  res.render("user/user", {
    user: req.user,
    path: filePath,
  });
};
exports.updateUser = async (req, res) => {
  id = req.params.userId;
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  enterprise = req.body.enterprise;
  address = req.body.address;
  await User.updateUser(id, firstname, lastname, enterprise, address).catch(
    (err) => {
      req.flash("error", err);
      res.redirect("/login");
    }
  );
  req.flash("success", "utilisateur mis à joue avec succes");
  res.redirect("/user/updateUser");
};
exports.getLogout = (req, res) => {
  user: req.user,
    req.logout(function (err) {
      if (err) {
        req.flash("error", "impossible de se deconnecter");
        res.redirect("/");
      }
      req.flash("success", "merci de votre visite");
      res.redirect("/");
    });
};
exports.uploadFiles = async (req, res, next) => {
  if (!req.user) {
    req.flash("error", "cet utilisateur n'existe pas");
    res.redirect("/user/updateUser");
  }
  user = req.user;
  file = req.file;

  if (req.file.mimetype !== "application/pdf") {
    req.flash("error", "votre fichier doit $être un pdf");
    res.redirect("/user/updateUser");
  }
  pdf = req.file.path;
  User.uploadPdf(user.id, pdf);
  req.flash("success", "pdf uploadé avec succès");
  res.redirect("/user/updateUser");
};
exports.downloadFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", fileName);

  res.download(filePath, function (err) {
    if (err) {
      req.flash("error", err);
      res.redirect("/");
    }
  });
};
