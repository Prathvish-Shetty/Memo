import jwt from "jsonwebtoken"

export const generateAccessToken = (userId, email) => {
  return jwt.sign({ _id: userId, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  })
}

export const generateRefreshToken = (userId, email) => {
  return jwt.sign({ _id: userId, email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  })
}