import { restClient } from "@polygon.io/client-js";
import express from "express";
import fs from "fs";
const router = express.Router();
const PORT = process.env.PORT || 3001;
const POLY_API_KEY = "6tpcTLkI7qDOv8g7DW7tZ0XRyZHg1hme"; //  Polygon API key

const rest = restClient(POLY_API_KEY);
const stocksFile = "stocks.json";

// Function to fetch stocks from Polygon API
const fetchStocks = async () => {
  try {
    const response = await rest.stocks.aggregates();
    const stocks = response.aggregates.slice(0, 20).map((ticker) => ({
      ticker: ticker.ticker,
      openPrice: ticker.lastTrade?.p || null,
      refreshInterval: Math.floor(Math.random() * 5) + 1, // Random refresh interval between 1 to 5 seconds
    }));
    fs.writeFileSync(stocksFile, JSON.stringify(stocks));
    console.log("Stocks data updated successfully.");
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

// Function to update stock prices with random values
const updateStockPrices = () => {
  setInterval(() => {
    try {
      const stocks = JSON.parse(fs.readFileSync(stocksFile));
      stocks.forEach((stock) => {
        stock.openPrice += Math.random() - 0.5; // Random value update
      });
      fs.writeFileSync(stocksFile, JSON.stringify(stocks));
      console.log("Stock prices updated.");
    } catch (error) {
      console.error("Error updating stock prices:", error);
    }
  }, 1000); // Update every second
};

// Initial fetch and update
fetchStocks();
updateStockPrices();

// API endpoint to fetch stock prices
router.get("/stocks", (req, res) => {
  try {
    const stocks = JSON.parse(fs.readFileSync(stocksFile));
    res.json(stocks);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
