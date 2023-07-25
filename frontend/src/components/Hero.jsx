import { Container, Card, Button } from "react-bootstrap";

const Hero = () => {
	return (
		<div className=' py-5'>
			<Container className='d-flex justify-content-center'>
				<Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
					<h1 className='text-center mb-4'>
						Welcome to our MERN Stack Project!
					</h1>
					<p className='text-center mb-4'>
						Our MERN Stack Project is a full-stack web application built using
						the MERN stack, which stands for MongoDB, Express.js, React, and
						Node.js. The project comes with a robust authentication system that
						securely stores user data and utilizes JSON Web Tokens (JWT) to
						ensure a safe and seamless user experience.
					</p>
					<div className='d-flex'>
						<Button
							variant='primary'
							href='/login'
							className='me-3'
						>
							Sign In
						</Button>
						<Button
							variant='secondary'
							href='/register'
						>
							Register
						</Button>
					</div>
				</Card>
			</Container>
		</div>
	);
};

export default Hero;
