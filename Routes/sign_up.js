const Router = require("express");
const signUp = require("../Function/signUp");
const signUpUser = Router();
signUpUser.post("sign_up", signUp);

module.exports = signUpUser;
