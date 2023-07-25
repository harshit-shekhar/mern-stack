import asyncHandler from "express-async-handler";
import Image from "../models/imageModel.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// cloudinary config file
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Upload image
// @route   POST /api/images
// @access  Private
const uploadImage = asyncHandler(async (req, res) => {
	const { title, description, photo } = req.body;
	const photoUrl = await cloudinary.uploader.upload(photo);

	const image = await Image.create({
		title,
		description,
		image: photoUrl.secure_url,
		// user: req.user._id,
	});

	if (image) {
		res.status(201).json(image);
	} else {
		res.status(400);
		throw new Error("Invalid image data");
	}
});

// @desc    Get all images uploaded by the user
// @route   GET /api/images/user-images
// @access  Private
const getUserImages = asyncHandler(async (req, res) => {
	const images = await Image.find({});

	if (images) {
		res.json(images);
	} else {
		res.status(404);
		throw new Error("No images found for the user");
	}
});

const updateImageViews = asyncHandler(async (req, res) => {
	const image = await Image.findById(req.params.id);

	if (image) {
		image.views += 1; // Increment the views count by 1
		await image.save();
		res.json(image);
	} else {
		res.status(404);
		throw new Error("Image not found");
	}
});

const getImageDetails = asyncHandler(async (req, res) => {
	const imageId = req.params.id;

	try {
		const image = await Image.findById(imageId);
		if (!image) {
			return res.status(404).json({ message: "Image not found" });
		}

		res.json(image);
	} catch (err) {
		res.status(500).json({ message: "Internal server error" });
	}
});

export { uploadImage, getUserImages, updateImageViews, getImageDetails };
