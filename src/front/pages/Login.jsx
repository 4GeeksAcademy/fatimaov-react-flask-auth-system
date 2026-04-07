import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/private")
			return;
		}
	}, [])

	return (
		<div className="text-center mt-5 m-auto" style={{ maxWidth: 500 }} >
			<h1 className="display-2 my-5">Log In</h1>
			<LoginForm />
			<div className="alert alert-dark border-dark" role="alert">
				<p>Don't have an account yet? Click Sign up to create one.</p>
				<Link to="/signup">
					<button className="btn btn-warning">Sign up</button>
				</Link>
			</div>
		</div>
	);
}; 