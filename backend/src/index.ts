import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { productRouter } from './routers/productRouter'

dotenv.config()
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazona'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.use('/api/products', productRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
