import express from "express";

const router = express.Router();

router.post("/api/listing", listing);

export default router;
