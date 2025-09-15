// import type { Request, Response } from 'express';
// import { AppDataSource } from '../database';
// import { Cart } from '../entity/cart';
// import { CartItem } from '../entity/cartItem';
// import { Product } from '../entity/product';

// // Get cart for a user
// export const getCart = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user.userId;
//     const cartRepo = AppDataSource.getRepository(Cart);

//     let cart = await cartRepo.findOne({
//       where: { user: { userId } },
//       relations: ['items', 'items.product'],
//     });

//     if (!cart) {
//       cart = cartRepo.create({ user: { userId } as any, items: [] });
//       await cartRepo.save(cart);
//     }

//     return res.status(200).json(cart);
//   } catch (error) {
//     console.error('Error fetching cart:', error);
//     return res.status(500).json({ message: 'Failed to fetch cart', error });
//   }
// };

// // Add product to cart
// export const addToCart = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user.userId;
//     const { productId, quantity = 1 } = req.body;

//     const cartRepo = AppDataSource.getRepository(Cart);
//     const cartItemRepo = AppDataSource.getRepository(CartItem);
//     const productRepo = AppDataSource.getRepository(Product);

//     const product = await productRepo.findOne({ where: { productId: Number(productId) } });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     let cart = await cartRepo.findOne({
//       where: { user: { userId } },
//       relations: ['items', 'items.product'],
//     });

//     if (!cart) {
//       cart = cartRepo.create({ user: { userId } as any, items: [] });
//       await cartRepo.save(cart);
//     }

//     let existingItem = cart.items.find((item) => item.product.productId === Number(productId));

//     if (existingItem) {
//       existingItem.quantity += Number(quantity);
//       existingItem.price = Number(product.price);
//       await cartItemRepo.save(existingItem);
//     } else {
//       const newItem = cartItemRepo.create({
//         cart,
//         product,
//         quantity: Number(quantity),
//         price: Number(product.price),
//       });
//       cart.items.push(newItem);
//     }

//     await cartRepo.save(cart);
//     return res.status(200).json({ message: 'Product added to cart', cart });
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     return res.status(500).json({ message: 'Failed to add product to cart', error });
//   }
// };

// // Update cart item quantity
// export const updateCartItem = async (req: Request, res: Response) => {
//   try {
//     const { cartItemId } = req.params;
//     const { quantity } = req.body;

//     const cartItemRepo = AppDataSource.getRepository(CartItem);
//     const item = await cartItemRepo.findOne({ where: { cartItemId: Number(cartItemId) } });

//     if (!item) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     item.quantity = Number(quantity);
//     await cartItemRepo.save(item);

//     return res.status(200).json({ message: 'Cart item updated successfully', item });
//   } catch (error) {
//     console.error('Error updating cart item:', error);
//     return res.status(500).json({ message: 'Failed to update cart item', error });
//   }
// };

// // Remove cart item
// export const removeCartItem = async (req: Request, res: Response) => {
//   try {
//     const { cartItemId } = req.params;

//     const cartItemRepo = AppDataSource.getRepository(CartItem);
//     const item = await cartItemRepo.findOne({ where: { cartItemId: Number(cartItemId) } });

//     if (!item) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     await cartItemRepo.remove(item);
//     return res.status(200).json({ message: 'Cart item removed successfully' });
//   } catch (error) {
//     console.error('Error removing cart item:', error);
//     return res.status(500).json({ message: 'Failed to remove cart item', error });
//   }
// };
