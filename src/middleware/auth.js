const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let tokenHeader = req.header("Authorization");
    token = tokenHeader && tokenHeader.split(" ")[1];

    if (token == null) {
      return res.status(401).send("unauthorized user!!");
    }
    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err) => {
      if (err) {
        return res.status(419).send(err.message);
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = auth;
