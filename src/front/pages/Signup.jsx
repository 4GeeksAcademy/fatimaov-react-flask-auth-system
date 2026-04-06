import { SignupForm } from "../components/SignupForm.jsx";
import { Link } from "react-router-dom";

export const Signup = () => {



    return (
        <div className="text-center mt-5">
            <h1>Signup page</h1>
            <SignupForm />
            <Link to="/">
                <button className="btn btn-primary">Login</button>
            </Link>
        </div>
    );
}; 