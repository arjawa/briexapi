const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const randomBytes = require("random-bytes");
const {
  userLogin,
  addUser,
  verifyUser,
  updateStatus,
  updatePassword
} = require("../models/userModel");
const {
  sendVerification,
  sendResetLink
} = require("../lib/mailjet");
const {
  getDateInt
} = require("../lib/functions");


const acceptedEmail = /^\S+@\S+\.\S+$/;
const acceptedPassword = /^((?=.*[A-Z])|(?=.*[a-z]))((?=.*[!@#\$%\^&\*])|(?=.*[0-9]))/;

const loginForm = (req, res) => {
  res.render("user/login", {
    title: "Login"
  });
};

const login = async (req, res) => {
  let {
    email,
    password
  } = req.body;
  if (!email || !password) return res.status(400).send("Email or password can not be empty!");

  try {
    let data = await userLogin(email);
    if (typeof data === "object") {
      if (bcrypt.compareSync(password, data.password)) {
        req.session.loggedIn = true;
        req.session.userData = data;
        res.send("Login success");
      } else {
        res.status(400).send("Password incorrect");
      }
    } else {
      res.status(400).send("Invalid email or password");
    }
  } catch (e) {
    console.log(e);
  }
};

const registerForm = async (req, res) => {
  res.render("user/register", {
    title: "Register"
  });
};

const register = async (req, res) => {
  let {
    email,
    password,
    passwordConfirmation
  } = req.body;
  let apikey = await randomBytes(16);
  let uniqueString = await randomBytes(16);

  if (!email || !password) return res.status(400).send("Email or password can not be empty!");
  if (!email.match(acceptedEmail)) return res.status(400).send("Please use a valid common email");
  if (password !== passwordConfirmation) return res.status(400).send("Password not match!");
  if (password.length < 6) return res.status(400).send("Password length must be 6 character or longer");
  if (!password.match(acceptedPassword)) return res.status(400).send("Password must contain at least 1 number or special character");

  let register = await addUser(email, bcrypt.hashSync(password, salt), apikey.toString("hex"), uniqueString.toString("hex"), getDateInt());
  if (register === true) {
    sendVerification(email, uniqueString.toString("hex"));
    res.send("Please check your email");
  } else {
    res.status(400).send("Email is already exists!");
  }
};

const verify = async (req, res) => {
  let {
    uniqueString
  } = req.params;
  let isVerified = await verifyUser(uniqueString);

  if (typeof isVerified === "object") {
    res.send("Your account has been verified!");
  } else {
    res.status(400).send("Invalid verification key");
  }
};

const resetForm = (req, res) => {
  res.render("user/forgot-password", {
    title: "Reset Password"
  });
};

const reset = async (req, res) => {
  let {
    email
  } = req.body;
  let uniqueString = await randomBytes(16);

  if (!email) return res.status(400).send("Email can not be empty!");

  let update = await updateStatus(email, uniqueString.toString("hex"));
  if (update === true) {
    sendResetLink(email, uniqueString.toString("hex"));
    res.send("Please check your email");
  } else {
    res.status(400).send("Email does not exists!");
  }
}

const resetPasswordForm = async (req, res) => {
  let {
    uniqueString
  } = req.params;
  let isVerified = await verifyUser(uniqueString);

  if (typeof isVerified === "object") {
    res.render("user/reset-password", {
      title: "Reset Password",
      oldPassword: isVerified.password
    });
  } else {
    res.status(400).send("Invalid confirmation key");
  }
};

const resetPassword = async (req, res) => {
  let {
    oldPassword,
    password,
    passwordConfirmation
  } = req.body;

  if (password !== passwordConfirmation) return res.status(400).send("Password not match!!");
  if (password.length < 6) return res.status(400).send("Password length must be 6 character or longer");
  if (!password.match(acceptedPassword)) return res.status(400).send("Password must contain at least 1 number or special character");

  let update = await updatePassword(oldPassword, bcrypt.hashSync(password, salt));
  if (update === true) {
    res.send("Password reset success!");
  } else {
    res.status(400).send("Failed to reset your password, plase try to not refresh the browser when open the reset link");
  }
}

const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.userData = null;
  res.redirect("/login");
};

module.exports = {
  loginForm,
  login,
  registerForm,
  register,
  verify,
  resetForm,
  reset,
  resetPasswordForm,
  resetPassword,
  logout
};