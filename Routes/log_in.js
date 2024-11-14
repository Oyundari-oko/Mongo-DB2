const Router2 = require("express");
const logIn = require(".");
const log_in = Router2();
log_in.post("log_in", logIn);
module.exports = log_in;
