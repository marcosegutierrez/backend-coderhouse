import { Router } from "express";
const router = Router();
import {
    logout, 
    loginResponse, 
    registerResponse,
    githubResponse,
    loginResponseApiClient
} from "../controllers/user.controller.js";
import passport from "passport";

router.post('/logout', logout);

router.post('/login', passport.authenticate('login'), loginResponse);
router.post('/register', passport.authenticate('register'), registerResponse);

router.post('/login-api-client', passport.authenticate('login'), loginResponseApiClient);

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/profile', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);


export default router;
