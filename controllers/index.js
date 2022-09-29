const getIndex = (req, res) => {
  // console.log(req.user);
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    res.render("index");
  }
};

module.exports = getIndex;
