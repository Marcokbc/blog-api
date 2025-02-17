import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import routers from "./app/routes/routes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

app.use(routers);

setupSwagger(app);

AppDataSource.initialize().then(async () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000: http://localhost:3000");
  });
});
