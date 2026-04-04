import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Signup = () => {

    const { store, dispatch } = useGlobalReducer()


    return (
        <div className="text-center mt-5">
            <h1>Sign up page</h1>
            <Link to="/">
                <button className="btn btn-primary">Login</button>
            </Link>
        </div>
    );
}; 