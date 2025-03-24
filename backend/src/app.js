import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

import authRouter from "./routes/auth.routes.js"
import memRouter from "./routes/mem.routes.js"

app.use("/api/auth", authRouter)
app.use("/api/mems", memRouter)

export { app }