import type { Request, Response } from 'express';
import { AppDataSource } from '../database';
import {Product} from "../entity/product"

export const addProduct = async (req: Request, res: Response)=>{
    try{
    const {productName, Price, Description} = req.body;
    console.log("Product details:", req.body)

    const productRepo = AppDataSource.getRepository(Product);
    if (!productName || !Price || !Description){
        return res.status(400).json({message: "Fill all fields for adding product"})
    }
    const product = await productRepo.findOneBy({productName: productName});
    if(!product){
        return res.status(404).json({message: "Product not found"});
    }
    const newProduct = new Product();
    newProduct.productName = productName;
    newProduct.Price = Price;
    newProduct.Description = Description;
    await productRepo.save(newProduct);
    return res.status(200).json({message: "Product added successfully..!!"})
    }catch(error){
        console.error("Error adding in product: ", error );
        res.status(500).json({message: "Failed to add Product", error})
    }

}