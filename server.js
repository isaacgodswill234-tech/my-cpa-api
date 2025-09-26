import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  try {
    // ✅ Collect all query parameters from MyLead postback
    const data = req.query;

    // ✅ Send them to your Google Sheet via SheetBest API
    await fetch("https://api.sheetbest.com/sheets/a8712e81-f061-4552-81f7-29bfd61d33f2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    // ✅ Send a 200 OK back to MyLead
    res.status(200).send("Postback saved successfully");
  } catch (error) {
    console.error("Error saving to sheet:", error);
    res.status(500).send("Failed to save postback");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
