const router = require("express").Router();
const {
  loginForm,
  login,
  register,
  registerForm,
  verify,
  resetpass,
  resetForm,
  logout
} = require("../controllers/userController");


router
.get("/login", loginForm)
.post("/login", login);

router
.get("/register", registerForm)
.post("/register", register);

router.get("/verify/:uniqueString", verify);

router.get("/reset-password", resetForm)
.post("/reset-password", resetpass);

router.get("/logout", logout);

module.exports = router;