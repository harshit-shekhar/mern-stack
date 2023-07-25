import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Loader from "../components/Loader";

const ImageDetails = ({ match }) => {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState([]);

	const fetchImageDetails = async () => {
		setLoading(true);

		try {
			console.log("I am here");
			console.log(match.params.id);
			const response = await fetch(
				`https://mern-stack-8ppm.onrender.com/api/images/image-details/${match.params.id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				setImage(result);
			}
		} catch (err) {
			alert(err);
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImageDetails();
	}, [match.params.id]);

	return (
		<Container>
			<h1 className='my-3'>Image Details</h1>
			{loading ? (
				<Loader />
			) : (
				<div>
					{image ? (
						<>
							<Image
								src={image.image}
								alt={image.title}
								fluid
							/>
							<h2>{image.title}</h2>
							<p>{image.description}</p>
							<p>Views: {image.views}</p>
						</>
					) : (
						<p>Image details not found.</p>
					)}
				</div>
			)}
		</Container>
	);
};

export default ImageDetails;
