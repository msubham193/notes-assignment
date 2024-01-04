import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import connectDB from "./util/db.js";
// import user from "./routes/user.js";

import user from "./routes/user.js";
import notes from "./routes/notes.js";

config();
const app = express();
app.use(json());

app.use("/api/auth", user);
app.use("", notes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB(process.env.DATA_BASE_URL);
  console.log("Server is running on port " + PORT);

  console.log("url: http://localhost:" + PORT);
});

export { app };
