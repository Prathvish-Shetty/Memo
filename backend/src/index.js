import dotenv from "dotenv"
import connectDB from "./db.js"
import { app } from "./app.js"

dotenv.config({
  path: "./env"
})

async function main(){
  try {
    await connectDB()
    app.listen(process.env.port || 8000, () => {
      console.log(`Server is listening at port ${process.env.PORT || 8000}`)
    })
  } catch (error) {
    console.log("MongoDB connection failed !!! ", err)
  }
}

main()