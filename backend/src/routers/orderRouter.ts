import express, { Request, Response } from 'express'
import { isAuth } from '../utils'
import expressAsyncHandler from 'express-async-handler'
import { OrderModel } from '../models/orderModel'
import { Product } from '../models/productModel'
export const orderRouter = express.Router()

orderRouter.get(
  // /api/orders/:id
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).send({ message: 'Order Not Found' })
    }
  })
)

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' })
    } else {
      const createdOrder = await OrderModel.create({
        orderItems: req.body.orderItems.map((x: Product) => ({
          ...x,
          product: x._id,
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      })
      res.status(201).send({ message: 'Order Not Found', order: createdOrder })
    }
  })
)
function asyncHandler(
  arg0: (req: Request, res: Response) => Promise<void>
): import('express-serve-static-core').RequestHandler<
  import('express-serve-static-core').ParamsDictionary,
  any,
  any,
  import('qs').ParsedQs,
  Record<string, any>
> {
  throw new Error('Function not implemented.')
}
