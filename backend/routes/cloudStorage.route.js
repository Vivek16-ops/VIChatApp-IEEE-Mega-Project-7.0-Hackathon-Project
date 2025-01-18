import express from "express";
import { savetoCloud } from "../controllers/cloudStorage.controller.js";
import { DropboxcloudTokenRegenerate } from "../controllers/cloudTokenRegeneration.controller.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/cloudTokenRegeneration", DropboxcloudTokenRegenerate)
router.post("/cloudStorage", upload.single('file'), savetoCloud)

export default router