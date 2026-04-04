import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Login = () => {

	const { store, dispatch } = useGlobalReducer()


	return (
		<div className="text-center mt-5">
			<h1>Login page</h1>
			<Link to="/signup">
				<button className="btn btn-primary">Sign up</button>
			</Link>
		</div>
	);
}; 