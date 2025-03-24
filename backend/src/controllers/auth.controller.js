import { User } from "../models/user.model.js"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const existedUser = await User.findOne({ email })
    if (existedUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    let user = await User.create({ name, email, password })
    const accessToken = generateAccessToken(user._id, user.email)
    const refreshToken = generateRefreshToken(user._id, user.email)
    user.refreshToken = refreshToken
    await user.save()
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 30 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(201).json({
      message: "User Signed up Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken
    })
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Something went wrong while signing up the user" })
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User does not exist" })
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials" })
    }
    const accessToken = generateAccessToken(user._id, user.email)
    const refreshToken = generateRefreshToken(user._id, user.email)
    user.refreshToken = refreshToken
    await user.save()
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 30 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(200).json({
      message: "Login successful", accessToken, user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

export const logout = async (req, res) => {
  try {
    let user = await User.findOne({ refreshToken: req.cookies?.refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "None" });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "None" });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
    let user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken(decoded?._id, decoded?.email)
    const newRefreshToken = generateRefreshToken(decoded?._id, decoded?.email);
    user.refreshToken = newRefreshToken;
    await user.save();
    res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 30 * 60 * 1000 });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Refresh token expired. Please log in again." });
  }
};