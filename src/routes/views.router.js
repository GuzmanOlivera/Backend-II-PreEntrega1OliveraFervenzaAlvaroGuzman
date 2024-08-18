import { Router } from "express";
import ProductManager from "../dao/db/product-manager-db.js";
import CartManager from "../dao/db/cart-manager-db.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

import extractUserFromToken from "../util/extract-user-from-token.js";

router.use(extractUserFromToken);

router.get("/", async (req, res) => {
    try {

        if (!res.locals.role) {
            return res.render("login");
        }

        const { limit = 10, page = 1, sort, query } = req.query;

        const products = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        const arrayProducts = products.docs.map(product => {
            return product._doc;
        });

        res.render(
            'home',
            {
                products: arrayProducts,
                totalPages: products.totalPages,
                prevPage: products.prevPage || 1,
                nextPage: products.nextPage || null,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null
            }
        );

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

router.get("/products/:pid", async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (!product) {
            return res.status(404).render("404", { message: "Producto no encontrado" });
        }
        res.render("productDetail", { product });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Error fetching product details");
    }
});

router.get('/realtimeproducts', async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    try {
        const products = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        const arrayProducts = products.docs.map(product => {
            return product._doc;
        });

        res.render(
            'realTimeProducts',
            {
                products: arrayProducts,
                totalPages: products.totalPages,
                prevPage: products.prevPage || 1,
                nextPage: products.nextPage || null,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null
            }
        );

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

router.get("/carts/:cid", async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).render("404", { message: "Carrito no encontrado" });
        }
        const plainCart = cart.toObject();
        res.render(
            'cartDetail',
            {
                cart: plainCart,
            }
        );
    } catch (error) {
        console.error("Error al obtener detalles del carrito: ", error);
        res.status(500).send("Error al obtener detalles del carrito");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/admin", (req, res) => {
    if (res.locals.role === 'admin') {
        res.render('admin');
    } else {
        res.status(403).send('Unauthorized');
    }
});

export default router;
