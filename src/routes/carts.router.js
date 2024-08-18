import { Router } from "express";
import CartManager from "../dao/db/cart-manager-db.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error("Error al crear carrito:", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        console.error("Error al obtener carrito por ID:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        res.json(updatedCart);
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
        res.json(updatedCart);
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const updatedCart = await cartManager.updateCart(req.params.cid, req.body.products);
        res.json(updatedCart);
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    const { quantity } = req.body;
    try {
        const updatedCart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        console.error("Error al actualizar la cantidad de productos en el carrito:", error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const updatedCart = await cartManager.clearCart(req.params.cid);
        res.json(updatedCart);
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
