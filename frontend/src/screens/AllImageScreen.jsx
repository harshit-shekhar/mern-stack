// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Loader from "../components/Loader";
// import { Link } from "react-router-dom";

// const AllImagesScreen = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [allPosts, setAllPosts] = useState([]);

// 	const fetchPosts = async () => {
// 		setLoading(true);

// 		try {
// 			const response = await fetch(
// 				"http://localhost:8080/api/images/user-images",
// 				{
// 					method: "GET",
// 					headers: {
// 						"Content-Type": "application/json",
// 					},
// 				}
// 			);

// 			if (response.ok) {
// 				const result = await response.json();
// 				setAllPosts(result);
// 				console.log(allPosts);
// 			}
// 		} catch (err) {
// 			alert(err);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchPosts();
// 	}, []);

// 	return (
// 		<Container>
// 			<h1 className='my-3'>All Uploaded Images</h1>
// 			<div className='d-flex justify-content-end mb-3 p-2'>
// 				<Link
// 					to='/upload-image'
// 					className='btn btn-primary btn-md'
// 				>
// 					Upload Image
// 				</Link>
// 			</div>
// 			{loading ? (
// 				<Loader />
// 			) : (
// 				<Row>
// 					{allPosts.map((image) => (
// 						<Col
// 							key={image._id}
// 							xs={6}
// 							md={4}
// 							lg={3}
// 						>
// 							<Card className='h-100'>
// 								<Card.Img
// 									variant='top'
// 									src={image.image}
// 									className='card-image'
// 								/>
// 								<Card.Body className='d-flex flex-column'>
// 									<Card.Title>{image.title}</Card.Title>
// 									<div className='description mb-auto'>{image.description}</div>
// 									<Button
// 										variant='primary'
// 										className='mt-auto'
// 									>
// 										View Details
// 									</Button>
// 								</Card.Body>
// 							</Card>
// 						</Col>
// 					))}
// 				</Row>
// 			)}
// 		</Container>
// 	);
// };

// export default AllImagesScreen;

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";

const AllImagesScreen = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState([]);

	const fetchPosts = async () => {
		setLoading(true);

		try {
			const response = await fetch(
				"http://localhost:8080/api/images/user-images",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const result = await response.json();
				setAllPosts(result);
			}
		} catch (err) {
			alert(err);
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleImageClick = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/images/${id}/views`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const updatedImage = await response.json();
				// Find the index of the updated image in the array and update the state
				const updatedAllPosts = allPosts.map((image) =>
					image._id === updatedImage._id ? updatedImage : image
				);
				setAllPosts(updatedAllPosts);
				navigate(`/image-details/${id}`);
			}
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Container>
			<h1 className='my-3'>All Uploaded Images</h1>
			<div className='d-flex justify-content-end mb-3'>
				<Link
					to='/upload-image'
					className='btn btn-primary btn-sm mr-2'
				>
					Upload Image
				</Link>
			</div>
			{loading ? (
				<Loader />
			) : (
				<Row>
					{allPosts.map((image) => (
						<Col
							key={image._id}
							xs={6}
							md={4}
							lg={3}
						>
							<Card className='h-100'>
								<Card.Img
									variant='top'
									src={image.image}
									className='card-image'
									onClick={() => handleImageClick(image._id)}
									style={{ cursor: "pointer" }} // Add cursor style to indicate clickable
								/>
								<Card.Body className='d-flex flex-column'>
									<Card.Title>{image.title}</Card.Title>
									<div className='description mb-auto'>{image.description}</div>
									<Button
										variant='primary'
										className='mt-auto'
										onClick={() => handleImageClick(image._id)}
									>
										View Details
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			)}
		</Container>
	);
};

export default AllImagesScreen;
