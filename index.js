const express = require("express");
const axios = require("axios");
const app = express();

// Replace this with your actual Google Sheets / Pipedream endpoint
const FORWARD_URL = "https://eo4r3r1fwqu0t31.m.pipedream.net";

app.get("/", async (req, res) => {
  try {
    const queryParams = req.query;

    // Forward to Pipedream
    const response = await axios.get(FORWARD_URL, { params: queryParams });

    // Log and respond
    console.log("✅ Forwarded data:", response.status);
    res.status(200).send("✅ Data forwarded to Google Sheets");
  } catch (err) {
    console.error("❌ Error forwarding data:", err.message);
    res.status(500).send("❌ Failed to forward data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
