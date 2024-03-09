import express from "express";
import { deleteUser, test, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
// update the user

router.post("/update/:id", verifyToken, updateUser);
// delete the user
router.delete("/delete/:id", verifyToken, deleteUser);
export default router;
