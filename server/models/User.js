import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Setting up the suer scehma
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,

    //using validator function to verify the email Id
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  //Applying a validation for the password to be more than 6 characters
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false, //to hide password
  },
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    

  },
});

//method to hash user password using bcrypt package
UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//adding JWT token using create JWT method - to restrict others views job created by a particular user
UserSchema.methods.newJWT = function () {
  // console.log(this);
  return jwt.sign({ userUniqId: this._id }, process.env.JWT_ENCKEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
