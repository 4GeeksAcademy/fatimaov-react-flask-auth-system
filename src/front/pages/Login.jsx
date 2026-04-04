import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

export const Login = () => {

	return (
		<div className="text-center mt-5">
			<h1>Login page</h1>
			<LoginForm />
			<Link to="/signup">
				<button className="btn btn-primary">Sign up</button>
			</Link>
		</div>
	);
}; 