import { Router } from "express";
const router = Router();
import {login, logout, register} from "../controllers/user.controller.js";

router.post("/login", login);
router.post('/register', register)
router.post("/logout", logout);

export default router;
