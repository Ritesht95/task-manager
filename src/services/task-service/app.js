import express from "express";
import { PORT } from "./config/config.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get("/", (req, res) => {
    return res.json({ message: "Welcome to Task Service" });
});

import Routes from "./routes/index.js";
app.use(Routes);

app.listen(PORT, () => console.log(`Task service is running on PORT ${PORT}`));