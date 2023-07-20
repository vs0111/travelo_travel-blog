const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRT_KEY, {
    expiresIn: "15m",
  });
  return token;
};

const Admin = mongoose.model("admin", adminSchema);

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { Admin, validateLogin };
