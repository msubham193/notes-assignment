import { hash, compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

import User from "../models/user.js";

export const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already taken" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create and sign a JWT token
    const token = sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    return res.status(200).json({ token, expiresIn: 3600 }); // expiresIn in seconds
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { signUp, logIn };
