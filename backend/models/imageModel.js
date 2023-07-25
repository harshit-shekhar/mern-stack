import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String, // Store the image URL here
			required: true,
		},
		// user: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User", // Reference to the User model
		// 	required: true,
		// },
		views: {
			type: Number,
			default: 0, // Initialize the view count to zero
		},
	},
	{
		timestamps: true,
	}
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
