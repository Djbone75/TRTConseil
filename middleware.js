module.exports.middleware = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
};
module.exports.checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash(
      "error",
      "Vous devez vous identifier ou vous n'êtes pas abilité(e)"
    );
    return res.redirect("/user/login");
  }

  next();
};
module.exports.checkAdmin = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    req.user.active == true &&
    req.user.role == "admin"
  ) {
    return next();
  }
  req.flash(
    "error",
    "Vous devez vous identifier ou vous n'êtes pas abilité(e)"
  );
  return res.redirect("/user/login");
};
module.exports.checkConsultant = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    req.user.active == true &&
    (req.user.role == "consultant" || req.user == "admin")
  ) {
    return next();
  }
  req.flash(
    "error",
    "Vous devez vous identifier ou vous n'êtes pas abilité(e)"
  );
  return res.redirect("/user/login");
};
module.exports.checkRecruiter = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    req.user.active == true &&
    (req.user.role == "recruiter" ||
      req.user.role == "consultant" ||
      req.user == "admin")
  ) {
    return next();
  }
  req.flash(
    "error",
    "Vous devez vous identifier ou vous n'êtes pas abilité(e)"
  );
  return res.redirect("/user/login");
};
