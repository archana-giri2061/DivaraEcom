import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product";
import { ProductVariant } from "../entities/ProductVariant";

const productRepo = AppDataSource.getRepository(Product);
const variantRepo = AppDataSource.getRepository(ProductVariant);

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productRepo.find();
  res.json(products);
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, category, imageUrl, variants } = req.body;
    
    const product = productRepo.create({ name, description, category, imageUrl });
    await productRepo.save(product);

    if (variants && Array.isArray(variants)) {
      const items = variants.map(v => variantRepo.create({
        sku: v.sku,
        metalWeight: Number(v.metalWeight),
        metalPurity: v.metalPurity,
        price: Number(v.price),
        stockQuantity: Number(v.stockQuantity),
        productId: product.id
      }));
      await variantRepo.save(items);
    }

    const output = await productRepo.findOneBy({ id: product.id });
    res.status(201).json(output);
  } catch (err) {
    res.status(500).json({ message: "Failed to store luxury item details" });
  }
};