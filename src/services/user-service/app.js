import express, { Route } from "express";
import { PORT } from "./config/config.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get("/", (req, res) => {
    return res.json({ message: "Welcome to User Service" });
});

import Routes from "./routes/index.js";
app.use(Routes);

app.listen(PORT, () => console.log(`User service is running on PORT ${PORT}`));