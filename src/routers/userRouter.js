const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getAllUsers,
  getUser,
  deleteUser,
  updateRole,
  registerUser,
  loginUser,
  loginUserRefreshToken,
  sendpasslink,
  forgotPassword,
  postForgotPassword,
} = require("../controller/userController");

router.get("/allusers", auth, getAllUsers);
router.get("/allusers/:id", auth, getUser);
router.delete("/allusers/:id", auth, deleteUser);
router.put("/allusers/:id", auth, updateRole);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", loginUserRefreshToken);
router.post("/sendpasslink", sendpasslink);
router.get("/forgotpassword/:id/:token", forgotPassword);
router.post("/:id/:token", postForgotPassword);

module.exports = router;
