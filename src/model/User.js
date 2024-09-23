import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false },
  favoris: [{ type: Object, unique: true }],
  emailToken: { type: String },
  resetPasswordToken :{type: String},
  resetPasswordExpiry : {type: String},
  isVerified: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  updatedAt: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
