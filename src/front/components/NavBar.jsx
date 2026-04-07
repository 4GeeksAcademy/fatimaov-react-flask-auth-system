import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const NavBar = () => {

	const { dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.removeItem("token");
		dispatch({
			type: "RESET_DATA"
		});
		navigate("/");
	}

	return (
		<nav className="navbar navbar-expand-sm bg-dark border-bottom border-secondary-subtle">
			<div className="container">
				<span className="navbar-brand mb-0 h1 text-light">Private Area</span>
				<div className="d-flex align-items-center gap-3">
					<span className="text-secondary small mb-0">Authenticated session</span>
					<button onClick={handleLogout} className="btn btn-outline-light btn-sm">Log out</button>
				</div>
			</div>
		</nav>
	);
}; 
