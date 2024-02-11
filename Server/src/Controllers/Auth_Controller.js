import { User } from "../Models/User_Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthController {
  /* REGISTER A USER */
  register = async (req, res, next) => {
    const { name, email, password, address, phoneNo } = req.body;
    const picture = "";
    const picturePath = req.file ? req.file.filename : req.body.picture;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    try {
      const newUser = new User({
        name,
        email,
        password: passwordHash,
        picture,
        picturePath,
        address,
        phoneNo,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  /* Loggging User In */
  login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (error) {
      next(error);
    }
  };
}
