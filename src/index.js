const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
const textRoute = require("./routes/textRoute");
app.use("/api/texts", textRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/api/admin", adminRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});
