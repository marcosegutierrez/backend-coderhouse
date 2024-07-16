import { Router } from "express";
const router = Router();

// Debe haber un logeo previo, ver en navegador
router.get('/current', (req, res) => {
    if (req.session.email) res.redirect('/api/products');
    else res.status(401).json({ msg: 'Error de autenticacion' });
})

export default router;