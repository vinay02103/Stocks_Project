import express from "express";
import stockRouter from "./routers/stock.js";

const app = express();
const PORT = 5000;

app.use("/api", stockRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
