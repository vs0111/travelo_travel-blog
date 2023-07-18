const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  pename: { type: String, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  likes:{type:Array,required:false},
  author:{type:Boolean,required: false},
  block:{type:Boolean,required: false},
  photo:{type:String,required:false},
  blogs:{type:Array,required:false},
  support:{type:Array,required:false}

});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRT_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    phone: Joi.string()
      .custom((value, helpers) => {
        const regex = /^\+?[1-9]\d{1,14}$/;
        if (!regex.test(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      }, "Phone number validation")
      .required()
      .label("Phone Number"),
  });
  return schema.validate(data);
};
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate, validateLogin} ;
