import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Listen directly on your main URL
app.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Send to Google Sheet
    await fetch("https://api.sheetbest.com/sheets/a8712e81-f061-4552-81f7-29bfd61d33f2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        info: JSON.stringify(data),
        date: new Date().toISOString()
      })
    });

    res.json({ success: true, message: "Saved to sheet" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error" });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));
