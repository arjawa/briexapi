const router = require("express").Router();
const {
  loginForm,
  login,
  register,
  registerForm,
  verify,
  resetForm,
  reset,
  resetPasswordForm,
  resetPassword,
  logout
} = require("../controllers/userController");


router.get("/", (req, res) => {
  res.render("index", {
    title: "Home"
  });
});

router.get("/docs", (req, res) => {
  res.render("docs", {
    title: "Documentation"
  });
});

router
.get("/login", loginForm)
.post("/login", login);

router
.get("/register", registerForm)
.post("/register", register);

router.get("/verify/:uniqueString", verify);

router.get("/forgot-password", resetForm)
.post("/forgot-password", reset);
router.get("/reset-password/:uniqueString", resetPasswordForm)
.post("/reset-password", resetPassword);

router.get("/logout", logout);

module.exports = router;