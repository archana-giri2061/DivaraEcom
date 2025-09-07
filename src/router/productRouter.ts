import * as express from 'express';
import { addProduct } from '../controller/productController';
import { addOrder } from '../controller/orderController';
const router = express.Router()
router.post("/product", addProduct);
router.post("/order", addOrder);
export default router;