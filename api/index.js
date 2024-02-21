import express from "express";

const PORT = 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`THe server is runnut at http://localhost:${PORT}`);
});
