const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present..!"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid error..!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
  // ,
  // tokens:[{
  //     token:{
  //         type:String,
  //         required:true
  //     }
  // }]
});

userRegisterSchema.methods.generateAuthAccessToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_ACCESS_KEY,
      { expiresIn: "1m" }
    );
    // this.tokens = this.tokens.concat({token:token})
    await this.save();
    return token;
  } catch (err) {
    console.log("token error", err);
  }
};

userRegisterSchema.methods.generateAuthRefreshToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_REFRESH_KEY,
      { expiresIn: "24h" }
    );
    await this.save();
    return token;
  } catch (err) {
    console.log("token error", err);
  }
};

userRegisterSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const RegisterUser = new mongoose.model("RegisterUser", userRegisterSchema);

module.exports = RegisterUser;
