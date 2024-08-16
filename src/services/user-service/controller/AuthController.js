import bcrypt, { genSaltSync } from "bcrypt";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";
import Joi from 'joi';

class AuthController {
    static async signUp(req, res) {
        try {
            const payload = req.body;
            const salt = genSaltSync(10);
            const method = async (value) => {
                const userEmail = await prisma.user.findFirst({
                    where: { email: value },
                    select: { email: true },
                });
                if (userEmail)
                    throw new Error('Email already exists');
            };
            const schema = Joi.object({
                name: Joi.string()
                    .min(3)
                    .max(30)
                    .pattern(new RegExp(/^[a-zA-Z0-9 _-]*$/))
                    .error(
                        new Error('Name should be in valid format!'),
                    ),
                password: Joi.string()
                    .pattern(
                        new RegExp(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@~()$!%*?&])[A-Za-z\d@~()$!%*?&]/,
                        ),
                    )
                    .error(
                        new Error(
                            'Password must have at least one uppercase letter, one lowercase letter, one number and one special character (~@$!%*?&)!',
                        ),
                    ),
                email: Joi.string()
                    .email({
                        minDomainSegments: 2
                    })
                    .external(method)
                    .error(
                        new Error('Email should be valid format'),
                    ),
            });
            await schema.validateAsync(payload);
            payload.password = bcrypt.hashSync(payload.password, salt);
            const user = await prisma.user.create({
                data: payload
            });
            res.json({ message: "Signed up successfully!", user });
        } catch (err) {
            res.status(500).json({ message: err?.message ? err.message : "Something went wrong! Please try again." });
        }
    }

    static async login(req, res) {
        try {
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

        } catch (err) {
            res.status(500).json({ message: err?.message ? err.message : "Something went wrong! Please try again." });
        }
    }

    static async userMe(req, res) {
        const user = req.user;
        delete user.iat;
        delete user.exp;
        res.json({ user })
    }
}

export default AuthController;