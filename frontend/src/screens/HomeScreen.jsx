import Hero from "../components/Hero";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeScreen = () => {
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.auth);
	return (
		<>
			<Hero />
			{userInfo && (
				<Button
					to='/user-images'
					variant='primary'
					size='lg'
					onClick={() => navigate("/user-images")}
				>
					Go to All Images
				</Button>
			)}
		</>
	);
};
export default HomeScreen;
