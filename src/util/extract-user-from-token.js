import jwt from "jsonwebtoken";

const extractUserFromToken = (req, res, next) => {
    const token = req.cookies.coderCookieToken;

    if (token) {
        try {
            const decoded = jwt.verify(token, "extremelydifficulttorevealsecret");
            res.locals.username = decoded.username;
            res.locals.role = decoded.role;
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }

    next();
};

export default extractUserFromToken;
