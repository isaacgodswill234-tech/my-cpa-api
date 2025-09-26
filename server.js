import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const SHEET_URL = process.env.SHEET_URL; // Use Render Environment Variable

app.get("/postback", async (req, res) => {
  try {
    const { click_id, payout, status } = req.query;

    if (status === "approved") {
      const userPayout = parseFloat(payout) * 0.8; // keep 20% profit

      await fetch(SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: click_id,
          credit: userPayout,
          date: new Date().toISOString(),
        }),
      });

      console.log(`Credited ${click_id} with $${userPayout}`);
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(PORT, () => console.log(`Postback server running on ${PORT}`));