import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const NavBar = () => {

	const { dispatch } = useGlobalReducer();
	const navigate = useNavigate()

	function handleLogout() {
		localStorage.removeItem("token");
		dispatch({
			type: "RESET_DATA"
		})
		navigate("/");
	}

	return (
		<div className="text-center mt-5">
			<h1>NavBar</h1>
			<button onClick={handleLogout} className="btn btn-primary">Log out</button>
		</div>
	);
}; 