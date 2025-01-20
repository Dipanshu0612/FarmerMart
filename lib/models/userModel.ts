import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: String,
  wishlist: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("users_data", userSchema);

export default User;
