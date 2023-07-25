import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	uploadImage,
	getUserImages,
	updateImageViews,
	getImageDetails,
} from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload-image", uploadImage);
router.get("/user-images", getUserImages);
router.put("/:id/views", updateImageViews);
router.get("/image-details/:id", getImageDetails);
export default router;
