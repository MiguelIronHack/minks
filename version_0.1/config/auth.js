module.exports = {
  ensureAuth: function(req, res, next) {
    console.log(req.user.name);
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "You need to log in before proceeding");
    res.redirect("users/login");
  }
};
