const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// GET /api/users - get all users
const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /api/users/:id - get user by id
const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// POST /api/users - create new user (register) hashed password and token generated and check if user already exists or not
const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        email,
        password: hashedPassword,
        name,
        role,
        active: true,
      });
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("token", token, { httpOnly: true });
      res
        .status(201)
        .json({ message: "User created successfully", newUser, token });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// POST /api/users/login - login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      } else {
        await Users.findByIdAndUpdate(user._id, { active: true });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("token", token, { httpOnly: true });
        res
          .status(200)
          .json({ message: "Logged in successfully", user, token });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// PUT /api/users/logout - logout user
const logoutUser = async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.params.id, { active: false });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// heartbeats - check if user is logged in make sure the active stays true and if not logged in make sure active update to false path: /api/users/heartbeats
const heartbeats = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(200).json({ message: "Logged out successfully" });
    } else {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Users.findById(verified.userId);
      if (!user) {
        return res.status(200).json({ message: "Logged out successfully" });
      } else {
        await Users.findByIdAndUpdate(user._id, { active: true });
        res.status(200).json({ message: "Logged in successfully" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// PUT /api/users/:id - update user by id
const updateUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      {
        email,
        password: hashedPassword,
        name,
        role,
        updated_at: Date.now(),
      },
      { new: true }
    );
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE /api/users/:id - delete user by id
const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
};
