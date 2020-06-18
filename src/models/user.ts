import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import passport from "passport";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
});

userSchema.methods.encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("users", userSchema);
