import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("/api/stocks");
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    const interval = setInterval(fetchStocks, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="App">
      <h1>Stocks</h1>
      <div className="stocks-heading">
        <div>Stock-ticker</div>

        <div>Stock.OpenPrice</div>
      </div>
      <div className="stock-list">
        {stocks.map((stock) => (
          <div key={stock.ticker} className="stock">
            <span>{stock.ticker}</span>
            <span>{stock.openPrice.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
