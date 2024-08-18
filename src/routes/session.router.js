import { Router } from "express";
const router = Router();
import User from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../util/util.js";
import passport from "passport";
import jwt from "jsonwebtoken";

router.post("/register", async (req, res) => {
    const { username, password, email, firstName, lastName, role, age } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send("El usuario ya existe");
        }

        const newUser = new User({
            username,
            password: createHash(password),
            email,
            first_name: firstName,
            last_name: lastName,
            age,
            role,
            cart: null
        });

        await newUser.save();

        const token = jwt.sign({ username: newUser.username, role: newUser.role }, "extremelydifficulttorevealsecret", { expiresIn: "1h" });

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        });

        res.redirect("/api/sessions/current");

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return res.status(401).render("login", { errorMessage: "Nombre de usuario no válido" });
        }

        if (!isValidPassword(password, foundUser)) {
            return res.status(401).render("login", { errorMessage: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ username: foundUser.username, role: foundUser.role }, "extremelydifficulttorevealsecret", { expiresIn: "1h" });

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        });

        res.redirect("/api/sessions/current");

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).render("login", { errorMessage: "Error interno del servidor" });
    }
});

router.get("/current", passport.authenticate("jwt", { session: false }), async (req, res) => {
    if (req.user) {
        res.redirect("/");
    } else {
        res.status(401).send("No autorizado");
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
});

router.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).send("Acceso denegado");
    }
    res.render("admin");
});

export default router;
