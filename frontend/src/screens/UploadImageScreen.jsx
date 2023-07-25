import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const UploadImageScreen = () => {
	const [form, setForm] = useState({
		title: "",
		description: "",
		photo: null, // Store the image file object
	});
	const [isLoading, setIsLoading] = useState(false); // State to manage loading animation

	const navigate = useNavigate();

	const handleChangeTitle = (e) => setForm({ ...form, title: e.target.value });
	const handleChangeDesp = (e) =>
		setForm({ ...form, description: e.target.value });

	const TransformFile = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setForm({ ...form, photo: reader.result });
			};
		} else {
			setForm({ ...form, photo: "" });
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		TransformFile(file);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			if (form.title && form.description && form.photo) {
				setIsLoading(true); // Show loading animation while uploading

				try {
					const response = await fetch(
						"http://localhost:8080/api/images/upload-image",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ ...form }),
						}
					);
					const data = await response.json();
					console.log(data);
					// await dispatch(uploadImage({ title, description, photo }));
					toast.success("Image uploaded successfully");
					navigate("/user-images");
				} catch (err) {
					toast.error(err);
				} finally {
					setIsLoading(false); // Hide loading animation after uploading
				}
			}
		} catch (err) {
			toast.error("Please fill all fields and upload an image.");
		}
	};

	return (
		<>
			{isLoading && <Loader />}{" "}
			{/* Show Loader component when isLoading is true */}
			<Form onSubmit={submitHandler}>
				<Form.Group
					className='my-2'
					controlId='title'
				>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter title'
						value={form.title}
						onChange={handleChangeTitle}
					/>
				</Form.Group>

				<Form.Group
					className='my-2'
					controlId='description'
				>
					<Form.Label>Description</Form.Label>
					<Form.Control
						as='textarea'
						rows={3}
						placeholder='Enter description'
						value={form.description}
						onChange={handleChangeDesp}
					/>
				</Form.Group>

				<Form.Group
					className='my-2'
					controlId='image'
				>
					<Form.Label>Upload Image</Form.Label>
					<Form.Control
						type='file'
						accept='image/*' // Specify the accepted file types (images in this case)
						onChange={handleImageChange} // Capture the selected image file
					/>
				</Form.Group>

				<Button
					type='submit'
					variant='primary'
					className='mt-3'
				>
					Upload Image
				</Button>
				<Button
					variant='primary'
					className='mt-3 mx-4'
					onClick={() => navigate("/user-images")}
				>
					Go Back
				</Button>
			</Form>
		</>
	);
};

export default UploadImageScreen;
