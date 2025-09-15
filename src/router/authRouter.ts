import * as express from "express";
import {register, login, refresh} from "../controller/authentication";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/refresh", refresh);
export default router;