import type { Request, Response } from "express"; 
import { AppDataSource } from "../database";
import { Order } from "../entity/order";

export const addOrder = async (req: Request, res: Response)=>{
    // try{
    // const {OrderName, totalPrice} = req.body;
    // console.log("Order Details: ", req.body);
    // const orderRepo = AppDataSource.getRepository(Order)
    // const existingOrder = await orderRepo.findOneBy({OrderName: OrderName})
    // if(existingOrder){
    //     return res.status(400).json({message: "Order already places"})
    // }
    // const order = new Order()
    // order.OrderName = OrderName
    // order.totalPrice = totalPrice
    // await orderRepo.save(order);
    // return res.status(500).json({message: "Order has been placed"})
    // }catch(error){
    //     console.log("error shows in order place", error)
    //     res.status(500).json({message: "Failed to place order.."})
    // }
}