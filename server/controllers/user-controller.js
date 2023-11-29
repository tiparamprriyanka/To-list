import User from "../model/users.js";
import bcrypt from "bcryptjs";
// all users
export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
   return res.status(200).json({ users });
};
// signup register
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
  
  const hashpassword = bcrypt.hashSync(password);
  const user = new User ({ email ,username, password: hashpassword});
  await user 
    .save()
    .then(() => res.status(200).json({ message: "Sign Up Sucessfull"}));
  } catch (error) {
    res.status(200).json({ message: "User Already Exits"})
  }
};
// sigin
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email});
    if (!user) {
      res.status(200).json({ message: "Please Sign Up First"});
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res.status(200).json({ message: "Password Is Not Correct"})
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ others });

  } catch (error) {
    res.status(200).json({ message: " User Already Exits"})
  }
};
