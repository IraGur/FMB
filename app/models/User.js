const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "Please enter a name"],
      match: [/^[a-zA-Z]+$/, "is invalid"], //???
   },

   lastName: {
      type: String,
      required: [true, "Please enter a name"],
      match: [/^[a-zA-Z]+$/, "is invalid"], //???
   },

   addresses: [
      {
         label: String,
         value: String,
         lat: Number,
         lng: Number,
      },
   ],

   email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
   },

   password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
   },

   role: String,

   isHR: Boolean,

   isEligible: {
      type: Boolean,
      default: false,
   },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
