import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { AppDataSource } from "../config/data-source";
import { Order } from "../entities/Order";
import { ProductVariant } from "../entities/ProductVariant";

const orderRepo = AppDataSource.getRepository(Order);
const variantRepo = AppDataSource.getRepository(ProductVariant);

export const placeOrder = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { items } = req.body; 
    const userId = req.user!.id;

    let totalAmount = 0;
    const checkoutItems = [];

    for (const orderItem of items) {
      const variant = await variantRepo.findOne({
        where: { id: orderItem.variantId },
        relations: {
          product: true
        }
      });

      if (!variant || variant.stockQuantity < orderItem.quantity) {
        res.status(400).json({ message: `Item is out of stock.` });
        return;
      }

      variant.stockQuantity -= orderItem.quantity;
      await variantRepo.save(variant);

      const itemCost = Number(variant.price) * orderItem.quantity;
      totalAmount += itemCost;

      checkoutItems.push({
        productId: variant.productId,
        variantId: variant.id,
        name: variant.product.name,
        sku: variant.sku,
        quantity: orderItem.quantity,
        price: Number(variant.price)
      });
    }

    const order = orderRepo.create({ totalAmount, items: checkoutItems, userId });
    await orderRepo.save(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Transaction processing failed." });
  }
};