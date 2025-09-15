import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());

// Load quotes
const quotes = JSON.parse(fs.readFileSync("quotes.json", "utf-8"));

// Random quote
app.get("/random", (req, res) => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(random);
});

// All quotes
app.get("/quotes", (req, res) => {
  res.json(quotes);
});

// Search by author
app.get("/author/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const results = quotes.filter(q => q.author.toLowerCase().includes(name));
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Quotes API running at http://localhost:${PORT}`);
});
