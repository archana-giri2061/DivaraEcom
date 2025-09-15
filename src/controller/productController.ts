// import type { Request, Response } from 'express';
// import { AppDataSource } from '../database';
// import { Product } from '../entity/product';

// // Get all products
// export const getProduct = async (req: Request, res: Response) => {
//   try {
//     const productRepo = AppDataSource.getRepository(Product);
//     const products = await productRepo.find({ relations: ['category', 'images'] });
//     return res.status(200).json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return res.status(500).json({ message: 'Unable to fetch products', error });
//   }
// };

// // Add new product
// export const addProduct = async (req: Request, res: Response) => {
//   try {
//     const { name, description, price, material, stock, weight, categoryId } = req.body;

//     if (!name || !price || !description || !material || stock === undefined) {
//       return res.status(400).json({ message: 'All required fields must be filled' });
//     }

//     const productRepo = AppDataSource.getRepository(Product);
//     const existing = await productRepo.findOne({ where: { name } });
//     if (existing) {
//       return res.status(400).json({ message: 'Product already exists' });
//     }

//     const product = productRepo.create({
//       name,
//       description,
//       price,
//       material,
//       stock,
//       weight,
//       category: categoryId ? { categoryId: Number(categoryId) } : undefined,
//     });

//     await productRepo.save(product);
//     return res.status(201).json({ message: 'Product added successfully', product });
//   } catch (error) {
//     console.error('Error adding product:', error);
//     return res.status(500).json({ message: 'Failed to add product', error });
//   }
// };

// // Update product
// export const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;
//     const { name, description, price, material, stock, weight, categoryId } = req.body;

//     const productRepo = AppDataSource.getRepository(Product);
//     const product = await productRepo.findOne({ where: { productId: Number(productId) } });

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     product.name = name ?? product.name;
//     product.description = description ?? product.description;
//     product.price = price ?? product.price;
//     product.material = material ?? product.material;
//     product.stock = stock ?? product.stock;
//     product.weight = weight ?? product.weight;
//     if (categoryId) {
//       product.category = { categoryId: Number(categoryId) } as any;
//     }

//     await productRepo.save(product);
//     return res.status(200).json({ message: 'Product updated successfully', product });
//   } catch (error) {
//     console.error('Error updating product:', error);
//     return res.status(500).json({ message: 'Failed to update product', error });
//   }
// };

// // Delete product
// export const deleteProduct = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;

//     const productRepo = AppDataSource.getRepository(Product);
//     const product = await productRepo.findOne({ where: { productId: Number(productId) } });

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     await productRepo.remove(product);
//     return res.status(200).json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     return res.status(500).json({ message: 'Failed to delete product', error });
//   }
// };
