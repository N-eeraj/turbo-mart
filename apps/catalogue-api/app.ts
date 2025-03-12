import express from "express"
import router from "./src/routes/index.ts"

const app = express()
app.use(express.static("./public"))
app.use(express.json())
app.use(router)

app.listen(5000)
console.log(`Server running on port: ${5000}`)
