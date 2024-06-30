import { Router } from "express";
const router = Router();
import {
    login, 
    logout, 
    register, 
    loginResponse, 
    registerResponse,
    githubResponse
} from "../controllers/user.controller.js";
import passport from "passport";

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

router.post('/login-local', passport.authenticate('login'), loginResponse);
router.post('/register-local', passport.authenticate('register'), registerResponse);

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);


export default router;
