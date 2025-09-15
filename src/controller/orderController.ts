// import type { Request, Response } from 'express';
// import { AppDataSource } from '../database';
// import { Cart } from '../entity/cart';
// import { Order } from '../entity/order';
// import { OrderItems } from '../entity/orderItem';
// import { Payment } from '../entity/payment';

// // Create new order
// export const createOrder = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user.userId;
//     const { addressId, paymentMethod } = req.body;

//     const cartRepo = AppDataSource.getRepository(Cart);
//     const orderRepo = AppDataSource.getRepository(Order);
//     const orderItemRepo = AppDataSource.getRepository(OrderItems);
//     const paymentRepo = AppDataSource.getRepository(Payment);

//     const cart = await cartRepo.findOne({
//       where: { user: { userId } },
//       relations: ['items', 'items.product'],
//     });

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: 'Cart is empty' });
//     }

//     // Create order
//     const order = orderRepo.create({
//       user: { userId } as any,
//       address: { addressId } as any,
//       status: 'pending',
//       totalAmount: 0,
//       paymentStatus: 'pending',
//     });

//     let total = 0;
//     const orderItems: OrderItems[] = [];

//     for (const ci of cart.items) {
//       const oi = orderItemRepo.create({
//         order,
//         product: ci.product as any,
//         quantity: ci.quantity,
//         price: Number(ci.price),
//       });
//       total += Number(ci.price) * ci.quantity;
//       orderItems.push(oi);
//     }

//     order.totalAmount = total;
//     order.items = orderItems;

//     const savedOrder = await orderRepo.save(order);

//     // Create payment record
//     const payment = paymentRepo.create({
//       order: savedOrder,
//       method: paymentMethod,
//       status: 'pending',
//     });

//     await paymentRepo.save(payment);

//     // Clear cart
//     await cartRepo.remove(cart);

//     return res.status(201).json({ message: 'Order created successfully', order: savedOrder, payment });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     return res.status(500).json({ message: 'Failed to create order', error });
//   }
// };

// // Get all orders for user
// export const getOrders = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user.userId;
//     const orderRepo = AppDataSource.getRepository(Order);

//     const orders = await orderRepo.find({
//       where: { user: { userId } },
//       order: { createdAt: 'DESC' },
//       relations: ['items', 'items.product', 'address', 'payment'],
//     });

//     return res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     return res.status(500).json({ message: 'Unable to fetch orders', error });
//   }
// };

// // Get single order
// export const getOrder = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const orderRepo = AppDataSource.getRepository(Order);

//     const order = await orderRepo.findOne({
//       where: { orderId: Number(id) },
//       relations: ['items', 'items.product', 'address', 'payment'],
//     });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     return res.status(200).json(order);
//   } catch (error) {
//     console.error('Error fetching order:', error);
//     return res.status(500).json({ message: 'Failed to fetch order', error });
//   }
// };

// // Update order status
// export const updateOrderStatus = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const orderRepo = AppDataSource.getRepository(Order);
//     const order = await orderRepo.findOne({ where: { orderId: Number(id) } });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.status = status ?? order.status;
//     await orderRepo.save(order);

//     return res.status(200).json({ message: 'Order status updated successfully', order });
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     return res.status(500).json({ message: 'Failed to update order status', error });
//   }
// };
