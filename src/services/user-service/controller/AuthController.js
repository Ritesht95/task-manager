import bcrypt, { genSaltSync } from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";

class AuthController {
    static async signUp(req, res) {
        try {
            const payload = req.body;
            const salt = genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
            
            const user = await prisma.user.create({
                data: payload
            });

            res.json({ message: "Signed up successfully!", user });      
        } catch(err) {
            res.status(500).json({ message: "Something went wrong! Please try again." });
        }
    }


    static async login(req, res) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (user) {
            if (!bcrypt.compareSync(password, user.password)) {
                res.status(401).json({ message: "Invalid Password!" });
            } else {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    tokenVersion: user.tokenVersion
                };
    
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "7d"
                });
    
                res.json({ message: "Logged in successfully!", access_token: `Bearer ${token}` });
            }
        } else {
            res.status(401).json({ message: "Invalid Email!" });
        }
    }
}

export default AuthController;