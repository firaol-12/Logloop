import express from "express";
import multer from "multer";
import path from "path";
import { write } from "../controllers/post.js";
import {checkAuthor, deletePost, editPost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });


router.post("/write", verifyToken, upload.single("image"), write);
router.delete("/check-author/:id", verifyToken, deletePost);
router.put("/check-author/:id", verifyToken,upload.single("image"), editPost);
router.get("/check-author/:id", verifyToken, checkAuthor);



export default router;
