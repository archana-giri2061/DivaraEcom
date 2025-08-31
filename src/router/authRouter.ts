import * as express from "express";
import {register} from "../controller/authentication";

const router = express.Router();
router.post("/register", register);

export default router;