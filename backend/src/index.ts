import cors from 'cors'
import express, { Request, Response } from 'express'
import { sampleProducts } from './data'

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)

app.get('/api/products', (req: Request, res: Response) => {
  res.json(sampleProducts)
})

app.get('/api/products/:slug', (req: Request, res: Response) => {
  {
    /* res.json(sampleProducts.find((x) => x.slug === req.params.slug)) */
  }
  const product = sampleProducts.find((x) => x.slug === req.params.slug)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: 'Product Not Found' })
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
