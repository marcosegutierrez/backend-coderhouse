import { Router } from "express";
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';
import viewsRouter from './views.router.js';
import usersRouter from './user.router.js';
import sessionsRouter from './sessions.router.js';
import ticketRouter from './ticket.router.js';

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/', viewsRouter);
router.use('/users', usersRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/ticket', ticketRouter); // --> ticket/purchase

export default router;