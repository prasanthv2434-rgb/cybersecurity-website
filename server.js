const express = require("express");
const app = express();

// Serve all static files from current folder
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Cybersecurity Website running on port ${port}`));
