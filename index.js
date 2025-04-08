import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

// api Handler Import
import userHandler from "./route/userHandler.js";
import websiteRouter from "./route/websiteHandler.js";
import sectionRouter from "./route/sectionHandler.js";
import componentRouter from "./route/componentHandler.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect(process.env.MongoURL)
  .then(() => console.log("database connect successful"));

// user handler api
app.use("/user", userHandler);

// website handler api
app.use("/website", websiteRouter);

// sections handler api
app.use("/website", sectionRouter);

// component handler api
app.use("/website", componentRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log("server is runing...."));
