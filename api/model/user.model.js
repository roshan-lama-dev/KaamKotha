import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      uniqure: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGdL9c3WA3ttAt5pfSBURmME=/user-photo-upload-example-2023-01-04%2000-00-00-2023-12-24%2014-48-05",
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
