import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  //   destructure the input from the user to add to the database using the user model we created

  const { email, password, username } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const newUser = new User({ email, username, password: hashedPassword });

    //   since the saving actually takes time we need to use aync await to handle the error and delays
    await newUser.save();
    //after the saving is done we need to send the response from the server as per the action occured
    res.status(201).json({
      message: "User created Successfully",
    });
  } catch (error) {
    next(error);
  }
};
