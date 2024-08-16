import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined) {
        return res.status(401).json({ message: "Unauthorized! Token not found!" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if(err) res.status(401).json({ message: "Unauthorized! Invalid token!" });
        req.user = payload;
        next();
    });
};

export default authMiddleware;