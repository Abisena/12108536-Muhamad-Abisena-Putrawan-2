export function auth(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    } else {
      return res.redirect("/unauthorized");
    }
  };
}
