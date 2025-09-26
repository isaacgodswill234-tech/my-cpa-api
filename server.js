import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Handle GET requests (for MyLead postbacks)
app.get("/", async (req, res) => {
  try {
    // Get data from query string (MyLead sends data like ?click_id=123&payout=1)
    const data = req.query;

    // Save to Google Sheet
    await fetch("https://api.sheetbest.com/sheets/a8712e81-f061-4552-81f7-29bfd61d33f2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        info: JSON.stringify(data),
        date: new Date().toISOString()
      })
    });

    // ✅ Respond with 200 OK so MyLead knows it worked
    res.status(200).send("OK");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error");
  }
});

// Handle POST requests too (just in case)
app.post("/", async (req, res) => {
  try {
    const data = req.body;
    await fetch("https://api.sheetbest.com/sheets/a8712e81-f061-4552-81f7-29bfd61d33f2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        info: JSON.stringify(data),
        date: new Date().toISOString()
      })
    });

    res.status(200).send("OK");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error");
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
