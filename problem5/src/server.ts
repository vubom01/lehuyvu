import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import resourceRoute from "./route/resourceRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/resources", resourceRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the Express TypeScript CRUD API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});