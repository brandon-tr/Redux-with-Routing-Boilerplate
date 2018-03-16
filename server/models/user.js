var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var bcrypt = require("bcrypt");

var NameValidator = [
  validate({
    validator: "isLength",
    arguments: [3],
    message: "Name should be more than 2 characters"
  }),
  validate({
    validator: "isAlpha",
    message: "Name should contain only letters"
  })
];
var PasswordValidator = [
  validate({
    validator: "isLength",
    arguments: [5, 40],
    message: "Password should be more than 4 characters"
  })
];

var UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "You need to have a first name"],
      validate: NameValidator
    },
    password: {
      type: String,
      required: [true, "You need to have a password"],
      validate: PasswordValidator
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", function(next) {
  if (this.password.length < 32) {
    bcrypt
      .hash(this.password, 10)
      .then(hashed_password => {
        this.password = hashed_password;
        next();
      })
      .catch(err => console.log(err));
  }
});

module.exports = mongoose.model("User", UserSchema);
